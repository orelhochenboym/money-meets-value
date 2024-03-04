import { eq } from 'drizzle-orm';
import React from 'react';
import yahooFinance from 'yahoo-finance2';
import { db } from '../../../../db/db';
import { holdings } from '../../../../db/schema/holdings';
import { stocks } from '../../../../db/schema/stocks';
import { users } from '../../../../db/schema/users';

type Props = { userId: string };

export const HoldingsTable: React.FC<Props> = async ({ userId }) => {
  const userHoldings = await db
    .select()
    .from(holdings)
    .leftJoin(stocks, eq(holdings.stockId, stocks.id))
    .leftJoin(users, eq(holdings.userId, users.id))
    .where(eq(users.clerkId, userId));

  return userHoldings.length === 0 ? (
    <div>No Holdings Found</div>
  ) : (
    userHoldings.map(async (userHolding) => {
      if (!userHolding.stocks) {
        return null;
      }

      const quoteSummary = await yahooFinance.quoteSummary(
        userHolding.stocks.symbol,
        { modules: ['quoteType'] },
      );
      return (
        <div
          key={userHolding.holdings.stockId}
          className="flex h-fit w-full items-center justify-center gap-4"
        >
          <span>{quoteSummary.quoteType?.symbol}</span>
          <span>{quoteSummary.quoteType?.longName}</span>
          <span>{userHolding.holdings.quantity}</span>
          <span>{userHolding.holdings.cost}</span>
        </div>
      );
    })
  );
};
