const Redis = require("ioredis");
const Job = require("./job");
const fs = require("fs");
const mitt = require("mitt");
const moment = require("moment");

class Connector {
  constructor(connector_config = {}) {
    this.messageHandlers = new Map();
    this.completeHandlers = new Map();
    this.pub = new Redis(connector_config);
    this.sub = new Redis(connector_config);
    this.sub.subscribe("queue");
    this.sub.on("message", this.messageHandler.bind(this));
    this.emitter = mitt();

    this.pub.defineCommand("register", {
      lua: fs.readFileSync(__dirname + "/../lua/register.lua", {
        encoding: "utf8"
      }),
      numberOfKeys: 1
    });

    this.pub.defineCommand("sort", {
      lua: fs.readFileSync(__dirname + "/../lua/sort.lua", {
        encoding: "utf8"
      }),
      numberOfKeys: 1
    });

    const saveJob = async job => {
      return await (job.id ? this.save(job) : this.register(job));
    };

    const emitAndSaveJob = type => {
      return async job => {
        await this.pub.publish(
          "queue",
          JSON.stringify({
            type: `job:${type}`,
            job: job.toJSON()
          })
        );
        return await saveJob(job);
      };
    };

    this.emitter.on("job:save", saveJob);
    this.emitter.on("job:start", emitAndSaveJob("start"));
    this.emitter.on("job:complete", emitAndSaveJob("complete"));
    this.emitter.on("job:fail", emitAndSaveJob("fail"));

    this.addMessageHandler("job:complete", async msg => {
      const { job } = msg;
      if (this.completeHandlers.has(job.id)) {
        let handlers = this.completeHandlers.get(parseInt(job.id));
        for (let index in handlers) {
          await handlers[index](job);
        }
      }
    });
  }

  create(config = {}) {
    return new Job(config, this.emitter);
  }

  async createAndSave(config = {}) {
    const job = this.create(config);
    const saved = await this.register(job);
    this.emitter.emit("job:create", saved);
    return saved;
  }

  async register(job) {
    job.created_at = moment();
    job.status = "pending";
    const json = job.toJSON(true);
    const res = await this.pub.register(json);
    if (res) {
      try {
        console.log(res);
        job.hydrate(JSON.parse(res));
        this.emitter.emit("job:saved", job);
        return job;
      } catch (e) {}
    }
    return false;
  }

  async save(job) {
    job.updated_at = moment();
    await this.pub.set(`queue:job:${job.id}`, job.toJSON());
    this.emitter.emit("job:saved", job);
  }

  async sort(config = {}) {
    const json = await this.pub.sort(JSON.stringify(config));
    return JSON.parse(json);
  }

  async messageHandler(channel, message) {
    let msg;
    try {
      msg = JSON.parse(message);
    } catch (e) {
      msg = false;
    }

    if (!msg || !msg.type) {
      return;
    }

    if (this.messageHandlers.has(msg.type)) {
      const e = { propagate: true, error: false };
      this.messageHandlers.get(msg.type).forEach(async handler => {
        if (e.propagate && !e.error) {
          await handler(msg, e);
        }
      });

      if (e.error) {
        throw new Error(e.error);
      }
    }
  }

  addMessageHandler(type, handler) {
    console.log("type", type);
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, []);
    }

    this.messageHandlers.get(type).push(handler);
  }

  onComplete(id, handler) {
    id = parseInt(id);
    if (!this.completeHandlers.has(id)) {
      this.completeHandlers.set(id, []);
    }

    this.completeHandlers.get(id).push(handler);
  }
}

module.exports = Connector;
