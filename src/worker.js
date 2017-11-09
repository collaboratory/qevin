const Job = require("./job");
const fs = require("fs");
const moment = require("moment");
const Connector = require("./connector");

class Worker {
  constructor(connector_config = {}, config = {}) {
    this.connector = new Connector(connector_config);
    this.jobHandlers = new Map();
    this.config = config;
    this.listening = false;
    this.scanning = false;

    this.debug(`Thanqueue worker initializing...`);
    this.connector.pub.defineCommand("work", {
      lua: fs.readFileSync(__dirname + "/../lua/work.lua", {
        encoding: "utf8"
      }),
      numberOfKeys: 2
    });

    this.connector.pub.defineCommand("fail", {
      lua: fs.readFileSync(__dirname + "/../lua/fail.lua", {
        encoding: "utf8"
      }),
      numberOfKeys: 2
    });

    this.connector.pub.defineCommand("complete", {
      lua: fs.readFileSync(__dirname + "/../lua/complete.lua", {
        encoding: "utf8"
      }),
      numberOfKeys: 2
    });

    this.connector.pub.defineCommand("timeout", {
      lua: fs.readFileSync(__dirname + "/../lua/timeout.lua", {
        encoding: "utf8"
      }),
      numberOfKeys: 1
    });
  }

  async work(type) {
    this.debug(`\t[WORK] ${type}`);
    const job_str = await this.connector.pub.work(type, moment().unix());
    if (job_str) {
      const job = Job.fromJSON(JSON.parse(job_str), this.connector.pub);
      if (job_str && job) {
        await this.connector.pub.publish(
          "queue",
          JSON.stringify({
            type: "job:started",
            job: job.toJSON()
          })
        );
        this.debug(`\t[SYNC] ${JSON.stringify(job)}`);
        return await this.sync(job);
      }
    }

    return false;
  }

  async fail(job, remove = true) {
    await this.connector.pub.fail(parseInt(job.id), remove ? 1 : 0);
    await this.connector.pub.publish(
      "queue",
      JSON.stringify({
        type: "job:failed",
        job: job.toJSON()
      })
    );

    return await this.sync(job);
  }

  async complete(job, remove = true) {
    job.status = "complete";
    job.completed_at = moment().unix();
    await this.save(job, false);
    await this.connector.pub.publish(
      "queue",
      JSON.stringify({
        type: "job:complete",
        job: job.toJSON()
      })
    );

    return await this.connector.pub.complete(parseInt(job.id), remove ? 1 : 0);
  }

  async save(job, publish = true) {
    const json = job.toJSON();
    if (publish) {
      await this.connector.pub.publish(
        "queue",
        JSON.stringify({
          type: "job:saved",
          job: json
        })
      );
    }

    await this.sync(job);

    return await this.connector.pub.set(
      `queue:job:${job.id}`,
      JSON.stringify(json)
    );
  }

  async sync(job) {
    if (!job || !job.id) {
      return job;
    }

    if (this.config && this.config.sync) {
      console.log("Syncing job #" + job.id);
      return await this.config.sync(job);
    }

    return job;
  }

  debug() {
    if (this.config.debug) {
      console.log(...arguments);
    }
  }

  addJobHandler(type, handler) {
    this.debug(`\t[+ HANDLER] "${type}"`);
    this.jobHandlers.set(type, handler);
  }

  addJobHandlers(handlers) {
    this.debug(`Registering job handlers:`);
    Object.keys(handlers).forEach(type => {
      this.addJobHandler(type, handlers[type]);
    });
  }

  listen() {
    if (!this.listening) {
      this.connector.addMessageHandler("job:created", async msg => {
        this.debug(`\t[JOB CREATED]`);
        if (this.jobHandlers.has(msg.job.type)) {
          const handler = this.jobHandlers.get(msg.job.type);
          await this.work(msg.job.type)
            .then(job => {
              if (job) {
                handler(job, data => {
                  job.result = data;
                  this.complete(job);
                });
              }
            })
            .catch(err => {});
        }
      });

      this.interval = setInterval(() => {
        this.connector.pub.timeout(moment().unix()).then(timed_out => {
          if (timed_out > 0) {
            console.log(`WARNING: ${timed_out} job(s) timed out.`);
          }
          this.scan();
        });
      }, 3000);

      this.listening = true;
    }
  }

  async scan() {
    if (!this.scanning) {
      this.scanning = true;
      while (this.scanning) {
        let matched = false;
        for (let [type, handler] of this.jobHandlers) {
          this.debug(`\t[SCANNING] ${type}`);
          await this.work(type)
            .then(job => {
              if (job) {
                matched = true;
                handler(job, data => {
                  job.result = data;
                  this.complete(job);
                });
              }
            })
            .catch(err => {});
        }
        if (!matched) {
          this.scanning = false;
        }
      }
      this.scanning = false;
    }
  }
}

module.exports = Worker;
