const knex = require("database");
module.exports.default = (router, v) => {
  router
    .get(v("/jobs/:status?"), async (ctx, next) => {
      console.log("Jobs");
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

      const request = await ctx.es.search(query).catch(err => {
        console.log("Error", err);
      });
      const response = {
        page,
        pageSize
      };

      if (request) {
        const records = request.hits.hits.map(hit => {
          return {
            score: hit._score,
            ...hit._source
          };
        });

        response.pages = Math.ceil(request.hits.total / pageSize);
        response.records = records;
      } else {
        response.pages = 0;
        response.records = [];
      }

      ctx.body = response;
    })
    .get(v("/job/:id"), async (ctx, next) => {
      const { id } = ctx.params;
      const record = await ctx.es.get({
        index: "jobs",
        type: "job",
        id: id
      });

      ctx.body = {
        ...record._source
      };
    });
};
