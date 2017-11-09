const { Worker } = require("../../worker/src");
const knex = require("knex")(require("../knexfile").development);
const moment = require("moment");

const queue = new Worker();

console.log("Initializing queue mover.");

async function main() {
  await queue.ready;
  queue.addMessageHandler("job:failed", async (msg, e) => {
    await saveJob(msg.job);
  });
  queue.addMessageHandler("job:complete", async (msg, e) => {
    await saveJob(msg.job);
  });
}

async function saveJob(job) {
  const existing = await knex
    .table("queue_jobs")
    .where("id", job.id)
    .count()
    .first();

  if (parseInt(existing.count) > 0) {
    return await knex
      .table("queue_jobs")
      .where("id", job.id)
      .update({
        type: job.type,
        status: job.status,
        data: job.data,
        updated_at: moment()
      })
      .catch(err => {
        console.log("Error", err);
      });
  } else {
    return await knex
      .table("queue_jobs")
      .insert({
        id: job.id,
        type: job.type,
        status: job.status,
        data: job,
        created_at: moment()
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
}

main();
