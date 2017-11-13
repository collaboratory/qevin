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

    this.connector.emitter.on("job:saved", async job => {
      if (job.status == "complete") {
        await this.connector.pub.complete(job.id, 1);
      }
      await this.sync(job);
    });

    // Add the ping job handler
    this.addJobHandler("ping", async job => {
      return {
        pong: moment().format("x")
      };
    });
  }

  async claim(type) {
    this.debug(`\t[WORK] ${type}`);
    const job_str = await this.connector.pub.work(type, moment().format("x"));
    if (job_str) {
      return new Job(JSON.parse(job_str), this.connector.emitter);
    }

    return false;
  }

  async process(type, shouldThrow = true) {
    if (this.jobHandlers.has(type)) {
      const handle = this.jobHandlers.get(type);
      const job = await this.claim(type);
      if (job) {
        await job.start();
        await handle(job)
          .then(result => {
            return job.complete(result);
          })
          .catch(err => {
            return job.fail(err);
          });

        return job;
      }

      return null;
    }

    if (shouldThrow) {
      throw new Error("Job handler not registered for type " + type);
    }

    return false;
  }

  async save(job) {
    await this.pub.set(`queue:job:${job.id}`, ...job.toJSON());
    return await this.sync(job);
  }

  async sync(job) {
    if (!job || !job.id) {
      return job;
    }

    if (this.config && this.config.sync) {
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

  listen(scanInterval = 500) {
    if (!this.listening) {
      this.interval = setInterval(async () => {
        if (!this.scanning) {
          const timed_out = await this.connector.pub.timeout(
            moment().format("x")
          );
          if (timed_out > 0) {
            console.log(`WARNING: ${timed_out} job(s) timed out.`);
          }
          await this.scan();
        }
      }, scanInterval);

      this.listening = true;
    }
  }

  stopListening() {
    clearInterval(this.interval);
  }

  async scan() {
    if (!this.scanning) {
      this.scanning = true;
      while (this.scanning) {
        let matched = false;
        for (let [type, handler] of this.jobHandlers) {
          this.debug(`\t[SCANNING] ${type}`);
          let matching = await this.process(type, true);
          if (matching) {
            matched = true;
          }
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
