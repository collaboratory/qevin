const Connector = require("../../../../src/connector");
const connector = new Connector({});
const { isArray } = require("lodash");

module.exports = async (ctx, next) => {
  ctx.queue = connector;

  ctx.getSet = async (set_ids, set_prefix) => {
    return (await Promise.all(
      set_ids.map(id => {
        return ctx.queue.pub.get(`${set_prefix}:${id}`);
      })
    )).map(o => JSON.parse(o));
  };

  ctx.getIds = async (type, page = 0, pageSize = 25) => {
    return await ctx.queue.pub.zrange(
      type,
      page * pageSize,
      (page + 1) * pageSize
    );
  };

  ctx.getPageCount = async (type, pageSize = 25) => {
    const total = await ctx.queue.pub.zcount(type, 0, 100);
    return Math.ceil(total / pageSize);
  };

  ctx.getEntries = async (type, prefix, page = 0, pageSize = 25) => {
    const ids = await ctx.getIds(type, page, pageSize);
    return await ctx.getSet(ids, prefix);
  };

  ctx.getSorted = async (config = {}) => {
    const sorted = await ctx.queue.sort(config);
    return isArray(sorted) ? sorted : [];
  };

  await next();
};
