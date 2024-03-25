/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  await knex('todo').insert([
    {id: -5, todo: 'dummy data 1', ddate:'1998-12-24',dtime:'11:00:00',reminder:(`Overdue ${String.fromCodePoint(0x26A0)}`)},
    {id: -4, todo: 'dummy data 2', ddate:'1999-12-24',dtime:'11:00:00',reminder:(`Overdue ${String.fromCodePoint(0x26A0)}`)},
    {id: -3, todo: 'dummy data 3', ddate:'2000-12-24',dtime:'11:00:00',reminder:(`Overdue ${String.fromCodePoint(0x26A0)}`)}
  ]);
};