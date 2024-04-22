/* Only for cli */
const DB_HOST = 'localhost'
const DB_PORT = '5432'
const DB_USERNAME = 'postgres'
const DB_PASSWORD = 'postgres'
const DB_DATABASE = 'magalu_db'

module.exports = {
  ssl: false,
  extra: {
    ssl: null,
  },
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [__dirname + '/**/*.entity.js'],
  autoLoadEntities: false,
  synchronize: false,
  logging: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
  migrations: ['dist/src/migrations/*.js'],
  migrationsRun: true,
}
