const Redis = require("ioredis");

module.exports = async redis_config => {
  const redis = new Redis(redis_config);
  return await redis.flushdb();
};
