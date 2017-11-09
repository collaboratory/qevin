const Elasticsearch = require("elasticsearch");
const moment = require("moment");

module.exports = function(es_config) {
  const sync = [];
  const es = new Elasticsearch.Client(es_config);
  return async job => {
    await upsert(job.toJSON());
    return job;
  };

  async function upsert(job) {
    const { id, type, status, ...data } = job;

    try {
      sync.push({
        index: {
          _index: "jobs",
          _type: type,
          _id: id
        }
      });

      sync.push({
        indexed_at: moment(),
        ...data
      });

      await checkFlush();
    } catch (e) {
      console.log("Error", e);
      return false;
    }
  }

  async function checkFlush(force = false) {
    return sync.length >= 1000 || (sync.length && force)
      ? await es.bulk({ body: sync.splice(0, sync.length) })
      : false;
  }

  const saveInterval = setInterval(() => {
    checkFlush(true);
  }, 10000);
};
