import path from "path";

/**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */

export default {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "rocketnotes",
      password: "rocketnotes_password",
      database: "rocketnotes_db",
      port: 5433,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },

    useNUllAsDefault: true,
  },
};
// psql -U rocketnotes -d rocketnotes_db
