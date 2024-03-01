const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : 'imlot007',
      database : 'todolist'
    }
  });

  module.exports=knex;