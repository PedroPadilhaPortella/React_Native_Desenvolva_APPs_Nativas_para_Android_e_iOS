module.exports = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'tasks',
    user: 'postgres',
    password: '123456',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};