import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsTableName: 'migrations',
  entities: [__dirname + '/entities/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
  migrationsRun: false,
  cli: {
    migrationsDir: __dirname + '/migrations',
  },
};

export default config;
