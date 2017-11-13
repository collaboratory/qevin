const moment = require("moment");
class Job {
  constructor(config = {}, emitter = false) {
    this.callbacks = [];
    this.hydrate(config);
    this.emitter = emitter;
  }

  hydrate(config) {
    Object.keys(config).forEach(key => {
      if (config[key] !== undefined) {
        this[key] = config[key];
      }
    });
  }

  toJSON(stringify = false) {
    const res = {};
    const json = {
      id: this.id,
      type: this.type,
      data: this.data,
      priority: this.priority,
      timeout: this.timeout,
      retries: this.retries,
      delay: this.delay,
      status: this.status,
      started_at: this.started_at,
      completed_at: this.completed_at,
      result: this.result
    };
    Object.keys(json).forEach(key => {
      if (json[key] !== undefined) {
        res[key] = json[key];
      }
    });

    return stringify ? JSON.stringify(res) : res;
  }

  async complete(result = {}) {
    this.result = result;
    this.status = "complete";
    this.completed_at = moment().format("x");
    return await this.save("complete");
  }

  async fail(err = null) {
    this.error = err;
    this.status = "failed";
    this.failed_at = moment().format("x");
    return await this.save("fail");
  }

  async start() {
    this.status = "active";
    this.started_at = moment().format("x");
    return await this.save("start");
  }

  async save(action = "save") {
    return await this.emitter.emit(`job:${action}`, this);
  }
}

module.exports = Job;
