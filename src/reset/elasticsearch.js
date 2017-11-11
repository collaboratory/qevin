const Elasticsearch = require("elasticsearch");
module.exports = async es_config => {
  const es = new Elasticsearch.Client(es_config);
  return await es.indices.delete({
    index: "jobs"
  });
};
