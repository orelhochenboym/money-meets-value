'use server';

import yahooFinance from 'yahoo-finance2';

export const searchSymbol = async (symbol: string) => {
  if (symbol === '' || !symbol) {
    return null;
  }
  const search = await yahooFinance.search(symbol);
  return search;
};
