module.exports.default = (router, v) => {
  router.get(v("/search"), async (ctx, next) => {
    const { type, query } = ctx.request.query;
    const search = {
      index: "jobs",
      type,
      body: {
        query: {
          query_string: {
            query: query + "*"
          }
        }
      }
    };
    const results = await ctx.es.search(search);

    ctx.body = {
      results,
      search
    };
  });
};
