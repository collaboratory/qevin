const Elasticsearch = require("elasticsearch");
const moment = require("moment");

module.exports = function(es_config) {
  console.log("Loading ES sync");
  const sync = [];
  const es = new Elasticsearch.Client(es_config);

  const interval = setInterval(() => {
    checkFlush(true);
  }, 10000);

  return async job => {
    if (job.type !== "ping") {
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
      return await es.bulk({ body: sync.splice(0, sync.length) });
    }

    return false;
  }
};
