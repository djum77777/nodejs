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
          table.time('dtime');
          table.string('reminder',100).notNullable();
          table.timestamps(true,true)
      })
    }
/**
 * @param { import("knex").Knex } knex
 * @returns {Promise<void>}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('todo')
};