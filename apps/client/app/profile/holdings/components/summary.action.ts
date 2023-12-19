'use server';

import yahooFinance from 'yahoo-finance2';

export const quoteSummarySymbol = async (symbol: string) => {
  if (symbol === '' || !symbol) {
    return null;
  }
  const quoteSummary = await yahooFinance.quoteSummary(symbol, {
    modules: ['quoteType'],
  });
  return quoteSummary;
};
