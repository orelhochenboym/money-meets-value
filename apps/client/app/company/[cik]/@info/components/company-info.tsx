import yahooFinance from 'yahoo-finance2';

type Props = {
  ticker: string;
};

export const CompanyInfo: React.FC<Props> = async ({ ticker }) => {
  const quote = await yahooFinance.quote(ticker);

  return (
    <div className="flex h-full w-fit flex-col text-left">
      <h1 className="whitespace-nowrap text-4xl font-bold">{quote.longName}</h1>
      <span className="text-muted-foreground flex gap-2">
        <span>{quote.symbol}</span>
        <span>{quote.region}</span>
        <span>{quote.typeDisp}</span>
      </span>
      <h1 className="text-4xl font-bold">FIGI</h1>
    </div>
  );
};
