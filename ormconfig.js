module.exports = [
  {
    name: 'development',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  {
    name: 'production',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ['build/entity/**/*.js'],
    migrations: ['build/migration/**/*.js'],
    subscribers: ['build/subscriber/**/*.js'],
    cli: {
      entitiesDir: 'build/entity',
      migrationsDir: 'build/migration',
      subscribersDir: 'build/subscriber',
    },
  },
]
