const knex = require("database");

module.exports.default = (router, v) => {
  router.get("/status", async (ctx, next) => {
    const index = await ctx.queue.pub.get("queue:index");

    const pending = (await ctx.getIds("queue:jobs:pending", 0, -1)).length;
    const active = (await ctx.getIds("queue:jobs:active", 0, -1)).length;
    const workers = (await ctx.getIds("queue:workers", 0, -1)).length;
    const failed = parseInt(
      (await knex
        .table("queue_jobs")
        .where("status", "failed")
        .count()
        .first()).count
    );
    const complete = parseInt(
      (await knex
        .table("queue_jobs")
        .where("status", "complete")
        .count()
        .first()).count
    );

    ctx.body = {
      index,
      workers,
      pending,
      active,
      failed,
      complete
    };
  });
};
