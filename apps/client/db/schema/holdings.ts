import { decimal, integer, pgTable, uuid } from 'drizzle-orm/pg-core';
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
  quantity: integer('quantity').notNull(),
  cost: decimal('cost', { precision: 2 }).notNull(),
});
