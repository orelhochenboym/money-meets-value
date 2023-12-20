import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

declare global {
  // eslint-disable-next-line no-var
  var db: PostgresJsDatabase<typeof schema>;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === 'production') {
  db = drizzle(postgres('postgresql://postgres:postgres@localhost:5432/mmv'), {
    schema,
  });
} else {
  if (!global.db) {
    global.db = drizzle(
      postgres('postgresql://postgres:postgres@localhost:5432/mmv'),
      { schema },
    );
  }

  db = global.db;
}

export { db };
