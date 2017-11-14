const Worker = require("../src/worker");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));

if (!argv._.length) {
  console.log(argv);
  throw new Error("thanqueue config file not provided");
}

const configPath = path.resolve(argv._.shift());
if (!fs.existsSync(configPath)) {
  throw new Error("thanqueue config file not found: " + configPath);
}

console.log("Loading queue configuration at '" + configPath + "'");

const config = require(configPath);
const queue = new Worker(config);

async function main() {
  console.log("Initializing queue...");

  console.log("Scanning for stalled jobs");
  await queue.scan();

  console.log("Queue listening...");
  await queue.listen();
}
main();
