module.exports = function(queue) {
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
};
