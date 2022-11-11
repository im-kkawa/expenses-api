/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('expenses', function (table) {
    table.increments('id').primary(); // Set this column as the primary key
    table.date('date').notNullable();
    table.string('category', 32).notNullable();
    table.string('note', 32);
    table.bigint('deposit');
    table.bigint('withdrawal');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('expenses');
};
