import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: 'apps/client/db/schema/*',
  driver: 'pg',
  out: 'apps/client/db/drizzle',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'mmv',
  },
  verbose: true,
  strict: true,
});
