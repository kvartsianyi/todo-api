import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PORT = '5432',
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT, 10),
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: ['src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
