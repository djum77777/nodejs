/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('todo', function (table) {
          table.increments('id').primary;
          table.string('todo', 200).notNullable();
          table.date('ddate').notNullable();
          table.timestamps('dtime');
      })
    }
/**
 * @param { import("knex").Knex } knex
 * @returns {Promise<void>}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('todo')
};