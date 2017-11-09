const db_defaults = {
  client: "postgresql",
  connection: {
    database: "thanqueue",
    user: "thanqueue",
    password: "thanqueue"
  },
  pool: {
    min: 1,
    max: 4
  }
};

module.exports = {
  development: Object.assign({}, db_defaults),
  staging: Object.assign({}, db_defaults),
  production: Object.assign({}, db_defaults)
};
