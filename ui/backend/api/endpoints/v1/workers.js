module.exports.default = (router, v) => {
  router.get(v("/workers"), async (ctx, next) => {
    ctx.body = await ctx.getEntries("queue:workers", "queue:worker");
  });
};
