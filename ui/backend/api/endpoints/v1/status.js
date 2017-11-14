const knex = require("database");
const moment = require("moment");

module.exports.default = (router, v) => {
  router.get("/status", async (ctx, next) => {
    const index = await ctx.queue.pub.get("queue:index");

    const pending = (await ctx.getIds("queue:jobs:pending", 0, -1)).length;
    const active = (await ctx.getIds("queue:jobs:active", 0, -1)).length;
    const workers = (await ctx.getIds("queue:workers", 0, -1)).length;
    const failed = await ctx.es
      .count({
        index: "jobs",
        body: {
          query: {
            bool: {
              filter: {
                terms: {
                  status: ["failed"]
                }
              }
            }
          }
        }
      })
      .then(res => {
        return res.count;
      })
      .catch(err => {
        return false;
      });

    const complete = await ctx.es
      .count({
        index: "jobs",
        body: {
          query: {
            bool: {
              filter: {
                terms: {
                  status: ["complete"]
                }
              }
            }
          }
        }
      })
      .then(res => {
        return res.count;
      })
      .catch(err => {
        return false;
      });

    const now = parseInt(moment().format("x"));
    const pong = await new Promise((resolve, reject) => {
      let resolved = false;

      // Time out if the job isn't completed after 3 seconds
      setTimeout(() => {
        if (!resolved) {
          reject(new Error("Timed out"));
        }
      }, 3000);

      // Create and save the job
      let job = ctx.queue
        .createAndSave({
          type: "ping",
          priority: 1,
          timeout: 5,
          retries: 3,
          data: {
            ping: now
          }
        })
        .then(job => {
          ctx.queue.onComplete(job.id, job => {
            resolve(parseInt(job.result.pong));
          });
        })
        .catch(err => {
          reject(err);
        });
    }).catch(err => {
      console.log("ERR", err);
    });

    const ping = pong ? pong - now : false;
    ctx.body = {
      index,
      workers,
      pending,
      active,
      failed,
      complete,
      ping
    };
  });
};
