const Elasticsearch = require("elasticsearch");

const es = new Elasticsearch.Client({
  host: "localhost:9200"
});

module.exports = async (ctx, next) => {
  ctx.es = es;
  await next();
};
