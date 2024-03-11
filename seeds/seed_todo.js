/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  await knex('todo').insert([
    {id: -5, todo: 'dummy data', ddate:'1998-12-24',dtime:'11:00:00',reminder:'overdue'}
  ]);
};