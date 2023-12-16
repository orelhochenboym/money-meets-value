'use server';

import { db } from '../../../../db/db';
import { holdings } from '../../../../db/schema/holdings';
import { stocks } from '../../../../db/schema/stocks';
import { users } from '../../../../db/schema/users';

type NewHolding = typeof holdings.$inferInsert;
type NewUser = typeof users.$inferInsert;
type NewStock = typeof stocks.$inferInsert;

export const insertHolding = async (holding: NewHolding) => {
  return db.insert(holdings).values(holding).returning();
};

export const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user).returning();
};

export const insertStock = async (stock: NewStock) => {
  return db.insert(stocks).values(stock).returning();
};
