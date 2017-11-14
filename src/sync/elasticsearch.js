const Elasticsearch = require("elasticsearch");
const moment = require("moment");

module.exports = {
  client: function(config) {
    return new Elasticsearch.Client(config);
  },
  sync: function(client) {
    const sync = [];

    console.log("Initializing ES Sync");

    const interval = setInterval(() => {
      checkFlush(true);
    }, 10000);

    return async job => {
      if (job.type !== "ping") {
        console.log("Syncing job");
        await upsert(job.toJSON());
      }
      return job;
    };

    async function upsert(job) {
      const { id, type, status, ...data } = job;

      try {
        sync.push({
          delete: {
            _index: "jobs",
            _type: "job",
            _id: id
          }
        });

        sync.push({
          index: {
            _index: "jobs",
            _type: "job",
            _id: id
          }
        });

        sync.push({
          indexed_at: moment().format("x"),
          id,
          type,
          status,
          ...data
        });

        return await checkFlush();
      } catch (e) {
        console.log("Error", e);
        return false;
      }
    }

    async function checkFlush(force = false) {
      if (sync.length >= 1000 || (sync.length && force)) {
        return await client.bulk({ body: sync.splice(0, sync.length) });
      }

      return false;
    }
  }
};
