'use server';

import yahooFinance from 'yahoo-finance2';
import { QuoteSummaryOptions } from 'yahoo-finance2/dist/esm/src/modules/quoteSummary';

export const quoteSummarySymbol = async (
  symbol: string,
  queryOptionsOverrides?: QuoteSummaryOptions,
) => {
  if (symbol === '' || !symbol) {
    return null;
  }

  const quoteSummary = await yahooFinance.quoteSummary(symbol, {
    ...queryOptionsOverrides,
  });

  return quoteSummary;
};
