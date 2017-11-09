const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const versioned = require("koa-versioned").default;

const redis = require("./middleware/redis");

const app = new Koa();
app.use(logger());
app.use(bodyParser());
app.use(redis);

const router = new Router();
app.use(
  versioned(router, {
    base_path: `${__dirname}/endpoints`
  })
);

console.log("ThanQueue UI API listening on port 3000");
app.listen(3000);
