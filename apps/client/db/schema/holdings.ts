import { pgTable, real, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { stocks } from './stocks';
import { users } from './users';

export const holdings = pgTable('holdings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  stockId: uuid('stock_id')
    .notNull()
    .references(() => stocks.id),
  quantity: real('quantity').notNull(),
  cost: real('cost').notNull(),
});

export type HoldingsInsertType = typeof holdings.$inferInsert;

export const HoldingsInsertSchema: z.ZodType<HoldingsInsertType> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  stockId: z.string().uuid(),
  quantity: z.number().positive(),
  cost: z.number().positive(),
});
