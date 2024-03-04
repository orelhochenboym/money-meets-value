import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const stocks = pgTable('stocks', {
  id: uuid('id').defaultRandom().primaryKey(),
  yahooId: uuid('yahooId').notNull(),
  symbol: varchar('symbol', { length: 5 }).notNull(),
});

export type StocksSelectType = typeof stocks.$inferSelect;
