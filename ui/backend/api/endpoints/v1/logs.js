const moment = require("moment");

module.exports.default = (router, v) => {
  router.get("/logs", async (ctx, next) => {
    let { search, page, pageSize } = ctx.query;
    page = page || 1;
    pageSize = pageSize || 25;

    const response = {
      page,
      pageSize
    };

    const request = await ctx.es
      .search({
        index: "logstash-*",
        from: (page - 1) * pageSize,
        size: pageSize,
        body: {
          sort: [{ "@timestamp": { order: "desc" } }]
        }
      })
      .catch(err => {
        console.log("Error", err);
      });

    if (request) {
      response.pages = Math.ceil(request.hits.total / pageSize);
      response.records = request.hits.hits.map(record => record._source);
    } else {
      response.pages = 0;
      response.records = [];
    }

    ctx.body = response;
  });
};
