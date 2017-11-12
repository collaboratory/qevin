const knex = require("database");
module.exports.default = (router, v) => {
  router
    .get(v("/jobs/:status?"), async (ctx, next) => {
      let { search, page, pageSize } = ctx.query;
      let { status } = ctx.params;
      page = page || 1;
      pageSize = pageSize || 25;

      const query = {
        index: "jobs",
        body: {
          from: (page - 1) * pageSize,
          size: pageSize,
          query: {
            bool: {}
          }
        }
      };

      if (status) {
        query.body.query.bool.filter = {
          terms: {
            status: [status]
          }
        };
      }

      if (search) {
        query.body.query.bool.must = {
          wildcard: {
            _all: search + "*"
          }
        };
      }

      const response = await ctx.es.search(query);
      const records = response.hits.hits.map(hit => {
        return {
          score: hit._score,
          ...hit._source
        };
      });

      ctx.body = {
        page,
        pageSize,
        pages: Math.ceil(response.hits.total / pageSize),
        records
      };
    })
    .get(v("/job/:id"), async (ctx, next) => {
      const { id } = ctx.params;
      const record = await ctx.es.get({
        index: "jobs",
        id: id
      });

      ctx.body = {
        ...record
      };
    });
};
