const Worker = require("../src/worker");
const moment = require("moment");
const argv = require("minimist")(process.argv.slice(2));

const sync = argv.pgsql
  ? require("../src/sync/pgsql")()
  : require("../src/sync/elasticsearch")({
      host: "localhost:9200"
    });

const queue = new Worker(
  {},
  {
    debug: false,
    sync
  }
);

async function main() {
  queue.addJobHandlers({
    test1: async (job, done) => {
      console.log("JOB:test1", job.data);
      done({
        rand: Math.random() * 1000 + job.data.a + job.data.b + job.data.c
      });
    },
    test2: async (job, done) => {
      console.log("JOB:test2", job.data);
      done({
        rand: Math.random() * job.data.a * job.data.b * job.data.c
      });
    },
    test3: async (job, done) => {
      console.log("JOB:test3", job.data);
      const rand = [];
      for (let i = 0; i < 100; i++) {
        rand.push(Math.random() * job.data.a * job.data.b * job.data.c);
      }
      done({
        rand
      });
    }
  });

  await queue.scan();
  await queue.listen();
}
main();
