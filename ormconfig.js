require('dotenv').config();

module.exports = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  logging: process.env.TYPEORM_LOGGING == 'true',
  entities: process.env.TYPEORM_ENTITIES,
  migrations: process.env.TYPEORM_MIGRATIONS,
  subscribers: process.env.TYPEORM_SUBSCRIBERS,
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    subscribersDir: process.env.TYPEORM_SUBSCRIBERS_DIR,
  },
};
