'use server';

import { and, eq } from 'drizzle-orm';
import { stocks } from '../../../../db/schema';

export const findOrCreateStock = async (symbol: string, yahooId: string) => {
  const attemptStock = await db
    .select()
    .from(stocks)
    .where(
      and(eq(stocks.symbol, symbol.toUpperCase()), eq(stocks.yahooId, yahooId)),
    );

  if (attemptStock.length !== 0) {
    return attemptStock;
  }

  const stock = await db
    .insert(stocks)
    .values({ symbol: symbol.toUpperCase(), yahooId });
  return stock;
};
