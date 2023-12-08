import yahooFinance from 'yahoo-finance2';
import { decimalFormatter, percentFormatter } from '../../../../../lib/utils';

type Props = {
  ticker: string;
};

export const CompanyPrice: React.FC<Props> = async ({ ticker }) => {
  const quote = await yahooFinance.quote(ticker);

  return (
    <div className="flex h-fit w-fit items-end justify-start gap-2">
      <h1 className="text-4xl font-bold">
        {quote.bid !== 0 ? quote.bid : quote.regularMarketPrice}
      </h1>
      <span className="text text-sm font-bold leading-6">{quote.currency}</span>
      <span
        className={`text-lg ${
          quote.regularMarketChange && quote.regularMarketChange > 0
            ? 'text-green-500'
            : 'text-destructive'
        }`}
      >
        {!quote.regularMarketChange
          ? 'N/A'
          : decimalFormatter.format(quote.regularMarketChange)}
      </span>
      <span
        className={`text-lg ${
          quote.regularMarketChangePercent &&
          quote.regularMarketChangePercent > 0
            ? 'text-green-500'
            : 'text-destructive'
        }`}
      >
        {`(${
          !quote.regularMarketChangePercent
            ? 'N/A'
            : percentFormatter.format(quote.regularMarketChangePercent / 100)
        })`}
      </span>
    </div>
  );
};
