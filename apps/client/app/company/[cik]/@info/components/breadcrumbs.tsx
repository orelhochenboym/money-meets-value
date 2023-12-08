import yahooFinance from 'yahoo-finance2';

type Props = { ticker: string };

export const Breadcrumbs: React.FC<Props> = async ({ ticker }) => {
  const search = await yahooFinance.search(ticker);

  const foundCompanySearch = search.quotes.find(
    (searchQuote) => ticker === searchQuote.symbol,
  );

  const items = [
    foundCompanySearch?.exchDisp,
    foundCompanySearch?.sector,
    foundCompanySearch?.industry,
  ];

  return (
    <div className="text-muted-foreground flex h-fit w-fit items-center gap-2 whitespace-nowrap">
      {items.map((item, i, array) => {
        const itemJsx = <div key={`${i}${item}`}>{item}</div>;

        if (array.length - 1 !== i) {
          return [
            itemJsx,
            <div
              key={i}
              className="bg-muted-foreground h-1.5 w-1.5 rounded-full"
            />,
          ];
        }
        return itemJsx;
      })}
    </div>
  );
};
