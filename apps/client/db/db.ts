import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { holdings } from './schema/holdings';
import { stocks } from './schema/stocks';
import { users } from './schema/users';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'mmv',
});

await client.connect();

export const db = drizzle(client, { schema: { holdings, stocks, users } });
