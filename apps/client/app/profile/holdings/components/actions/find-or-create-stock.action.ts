'use server';

import { and, eq } from 'drizzle-orm';
import { stocks } from '../../../../../db/schema';

export const findOrCreateStock = async (symbol: string, yahooId: string) => {
  const attemptStock = (
    await db
      .select()
      .from(stocks)
      .where(
        and(
          eq(stocks.symbol, symbol.toUpperCase()),
          eq(stocks.yahooId, yahooId),
        ),
      )
  ).find(
    (stock) =>
      stock.symbol === symbol.toUpperCase() && stock.yahooId === yahooId,
  );

  if (attemptStock) {
    return attemptStock;
  }

  const stock = (
    await db
      .insert(stocks)
      .values({ symbol: symbol.toUpperCase(), yahooId })
      .returning()
  ).find(
    (stock) =>
      stock.symbol === symbol.toUpperCase() && stock.yahooId === yahooId,
  );

  if (!stock) {
    throw new Error(
      'Something went wrong with creating the stock in the database',
    );
  }

  return stock;
};
