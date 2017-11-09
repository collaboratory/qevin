class Job {
  constructor(
    type,
    data,
    priority = 1,
    timeout = 30000,
    retries = 3,
    delay = 0,
    queue = false
  ) {
    this.id = false;
    this.type = type;
    this.data = data;
    this.priority = priority;
    this.timeout = timeout;
    this.retries = retries;
    this.delay = delay;
    this.queue = queue;
    this.status = "pending";
    this.started_at = null;
    this.completed_at = null;
    this.result = false;
  }

  static fromJSON(json, queue = false) {
    const job = new Job(false, false, false, false, false, false, queue);
    job.hydrate(json);
    return job;
  }

  toJSON() {
    return {
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
  }

  hydrate(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    });
    return this;
  }

  async save() {
    if (!this.id) {
      return await this.queue
        .create(this.type, JSON.stringify(this.toJSON()))
        .then(res => {
          const data = JSON.parse(res);
          this.queue.publish(
            "queue",
            JSON.stringify({
              type: "job:created",
              job: data
            })
          );
          return this.hydrate(data);
        });
    }

    return await this.queue.set(`queue:job:${this.id}`, ...this.toJSON());
  }
}

module.exports = Job;
