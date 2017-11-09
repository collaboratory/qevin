const Redis = require("ioredis");
const Job = require("./job");
const fs = require("fs");

class Connector {
  constructor(connector_config = {}) {
    this.messageHandlers = new Map();
    this.pub = new Redis(connector_config);
    this.sub = new Redis(connector_config);
    this.sub.subscribe("queue");
    this.sub.on("message", this.messageHandler.bind(this));

    this.pub.defineCommand("create", {
      lua: fs.readFileSync(__dirname + "/../lua/create.lua", {
        encoding: "utf8"
      }),
      numberOfKeys: 2
    });

    this.pub.defineCommand("sort", {
      lua: fs.readFileSync(__dirname + "/../lua/sort.lua", {
        encoding: "utf8"
      }),
      numberOfKeys: 1
    });
  }

  async sort(config = {}) {
    const json = await this.pub.sort(JSON.stringify(config));
    console.log("Sort", config, json);
    return JSON.parse(json);
  }

  create(type, data, priority = 1, timeout = 30, retries = 3, delay = 0) {
    const job = new Job(
      type,
      data,
      priority,
      timeout,
      retries,
      delay,
      this.pub
    );
    return job;
  }

  async createAndSave(
    type,
    data,
    priority = 1,
    timeout = 30,
    retries = 3,
    delay = 0
  ) {
    const job = this.create(type, data, priority, timeout, retries, delay);
    await job.save();
    return job;
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
