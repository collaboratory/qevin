const knex = require("knex")(require("../../database/knexfile").development);
const moment = require("moment");
const sync = [];

module.exports = function(es_config) {
  return async job => {
    await upsert(job.toJSON());
    return job;
  };
};

async function upsert(job) {
  const { id, type, status, ...data } = job;
  const existing = await knex
    .table("queue_jobs")
    .where("id", id)
    .first();

  if (existing) {
    await knex
      .table("queue_jobs")
      .where("id", id)
      .update({
        type,
        status,
        data,
        updated_at: moment()
      });
    return existing;
  }

  return await knex.table("queue_jobs").insert({
    id,
    type,
    status,
    data,
    created_at: moment()
  });
}
