// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mssql',
    connection: {
      server: 'localhost',
      database: 'ExamDB',
      user: 'root',
      password: 'root',
    },
    migrations: {
      directory: './database/migration',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
