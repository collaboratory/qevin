const Redis = require("ioredis");
const Job = require("./job");
const fs = require("fs");
const mitt = require("mitt");
const moment = require("moment");

class Connector {
  constructor(connector_config = {}) {
    this.messageHandlers = new Map();
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

    this.emitter.on("job:save", this.onSaveEmit.bind(this));
  }

  async onSaveEmit(job) {
    if (job.id) {
      return await this.save(job);
    } else {
      return await this.register(job);
    }
  }

  create(config = {}) {
    return new Job(config, this.emitter);
  }

  async createAndSave(config = {}) {
    const job = this.create(config);
    const saved = await this.register(job);
    return saved;
  }

  async register(job) {
    job.created_at = moment();
    const json = job.toJSON(true);
    const res = await this.pub.register(json);
    if (res) {
      try {
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
    const msg = JSON.parse(message);

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
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, []);
    }

    this.messageHandlers.get(type).push(handler);
  }
}

module.exports = Connector;
