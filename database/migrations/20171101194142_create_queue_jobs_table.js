exports.up = function(knex, Promise) {
  return knex.schema.createTable("queue_jobs", table => {
    table.integer("id").primary();
    table.string("type");
    table.enum("status", ["pending", "active", "failed", "complete"]);
    table.json("data");
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("queue_jobs");
};
