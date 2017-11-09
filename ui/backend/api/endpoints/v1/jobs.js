const knex = require("database");
module.exports.default = (router, v) => {
  router
    .get(v("/jobs/pending"), async (ctx, next) => {
      const page = ctx.query.page || 1;
      const pageSize = ctx.query.pageSize || 25;
      const sortingRaw = ctx.query.sorting ? JSON.parse(ctx.query.sorting) : {};
      const sorting = Object.keys(sortingRaw).length
        ? sortingRaw
        : { id: "asc" };

      ctx.body = {
        records: await ctx.getSorted({
          type: "pending",
          sorting,
          page: page - 1,
          pageSize
        }),
        page,
        pages: await ctx.getPageCount("queue:jobs:pending", pageSize)
      };
    })
    .get(v("/jobs/active"), async (ctx, next) => {
      const page = ctx.query.page || 1;
      const pageSize = ctx.query.pageSize || 25;
      const sorting = ctx.query.sorting || { id: "asc" };
      // TODO: Implement an array of objects for sorting, adjust lua acccordingly
      ctx.body = {
        records: await ctx.getSorted({
          type: "active",
          sorting,
          page: page - 1,
          pageSize
        }),
        page,
        pages: await ctx.getPageCount("queue:jobs:active", pageSize)
      };
    })
    .get(v("/jobs/failed"), async (ctx, next) => {
      const page = ctx.query.page || 1;
      const pageSize = ctx.query.pageSize || 25;

      const total = await knex
        .table("queue_jobs")
        .where("type", "failed")
        .count()
        .first();

      const records = await knex
        .table("queue_jobs")
        .where("type", "failed")
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      ctx.body = {
        records,
        page,
        pages: Math.max(Math.ceil(total.count / pageSize), 1)
      };
    })
    .get(v("/jobs/complete"), async (ctx, next) => {
      const page = ctx.query.page || 1;
      const pageSize = ctx.query.pageSize || 25;

      const total = await knex
        .table("queue_jobs")
        .where("status", "complete")
        .count()
        .first();

      const records = await knex
        .table("queue_jobs")
        .where("status", "complete")
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      ctx.body = {
        records,
        page,
        pages: Math.max(Math.ceil(total.count / pageSize), 1)
      };
    })
    .get(v("/job/:id"), async (ctx, next) => {
      const inDB = await knex
        .table("queue_jobs")
        .where("id", ctx.params.id)
        .first();

      const job = inDB
        ? inDB
        : JSON.parse(await ctx.redis.get(`queue:job:${ctx.params.id}`));

      ctx.body = {
        ...job
      };
    });
};
