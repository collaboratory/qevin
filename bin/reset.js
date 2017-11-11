const argv = require("minimist")(process.argv.slice(2));
const resetRedis = require("../src/reset/redis");

main();
async function main() {
  console.log("Resetting Redis...");
  await resetRedis();
  console.log("Done.");

  if (argv.pgsql) {
    console.log("Resetting PGSQL...");

    console.log("Done.");
  } else {
    console.log("Resetting Elasticsearch...");
    const resetES = require("../src/reset/elasticsearch");
    await resetES({
      host: "localhost:9200"
    }).catch(err => {});

    console.log("Done.");
  }

  process.exit();
}
