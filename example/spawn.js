const Connector = require("../src/connector");
const queue = new Connector();
const argv = require("minimist")(process.argv.slice(2));

console.log("Initializing queue spawner.");
async function main() {
  const spawned = argv._[0] || 1;
  await queue.ready;
  for (let i = 0; i < spawned; i++) {
    await queue
      .createAndSave({
        type: "test" + Math.round(1 + Math.random() * 2),
        data: {
          a: Math.random() * 5,
          b: Math.random() * 10,
          c: Math.random() * 25
        },
        priority: 1,
        timeout: 5,
        retries: 3
      })
      .then(res => {
        console.log(`Queue job #${res.id} created`);
      })
      .catch(err => {
        console.log("Failed to create queue job", err);
      });
  }
  process.exit();
}

main();
