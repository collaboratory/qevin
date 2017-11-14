const { sync, client } = require("../src/sync/elasticsearch");
const bunyan = require("bunyan");
const eslogger = require("bunyan-elasticsearch");

const es = client({
  host: "localhost:9200"
});

const log_es = new eslogger({
  indexPattern: "[logstash-]YYYY.MM.DD",
  type: "logs",
  host: "localhost:9200"
});

log_es.on("error", err => {
  console.log("ES Stream Error:", err.stack);
});

module.exports = {
  debug: false,
  connector: {},
  sync: sync(es),
  init: queue => {
    queue.addJobHandlers({
      test1: async job => {
        console.log("JOB:test1", job.data);
        return {
          rand: Math.random() * 1000 + job.data.a + job.data.b + job.data.c
        };
      },
      test2: async job => {
        console.log("JOB:test2", job.data);
        return {
          rand: Math.random() * job.data.a * job.data.b * job.data.c
        };
      },
      test3: async job => {
        console.log("JOB:test3", job.data);
        const rand = [];
        for (let i = 0; i < 100; i++) {
          rand.push(Math.random() * job.data.a * job.data.b * job.data.c);
        }
        return {
          rand
        };
      }
    });
  },
  logger: {
    name: "Example Application",
    streams: [{ stream: process.stdout }, { stream: log_es }],
    serializers: bunyan.stdSerializers
  }
};
