import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar';

const getCompanyInfo = async (cik: string) => {
  const companyinfo: Quote = await fetch(
    `http://localhost:3000/api/quote/${cik}`,
    {
      cache: 'no-cache',
    },
  ).then((res) => res.json());

  return companyinfo;
};

export default async function Index({ params }: { params: { cik: string } }) {
  const companyInfo = await getCompanyInfo(params.cik);

  return (
    <div className="flex flex-col h-fit w-1/2 gap-2">
      <div className="flex">
        <Avatar className="inline-flex h-16 w-16 select-none items-center justify-center overflow-hidden border align-middle">
          <AvatarImage className="object-contain" />
          <AvatarFallback>{companyInfo.symbol}</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col text-left">
          <h1 className="text-3xl font-bold">{companyInfo.longName}</h1>
          <span className="text-muted-foreground flex gap-2">
            <span>{companyInfo.symbol}</span>
            <span>{companyInfo.region}</span>
            <span>{companyInfo.typeDisp}</span>
          </span>
        </div>
      </div>
      <div className="flex h-full w-full items-end justify-start gap-2">
        <h1 className="text-3xl font-bold">
          {companyInfo.bid !== 0
            ? companyInfo.bid
            : companyInfo.regularMarketPrice}
        </h1>
        <span className="font-bold">{companyInfo.financialCurrency}</span>
        <span
          className={
            companyInfo.regularMarketChange &&
            companyInfo.regularMarketChange > 0
              ? 'text-green-500'
              : 'text-destructive'
          }
        >
          {companyInfo.regularMarketChange &&
          companyInfo.regularMarketChange > 0
            ? '+'
            : null}
          {companyInfo.regularMarketChange?.toFixed(2)}
        </span>
        <span
          className={
            companyInfo.regularMarketChange &&
            companyInfo.regularMarketChange > 0
              ? 'text-green-500'
              : 'text-destructive'
          }
        >
          {'('}
          {companyInfo.regularMarketChange &&
          companyInfo.regularMarketChange > 0
            ? '+'
            : undefined}
          {`${companyInfo.regularMarketChangePercent?.toFixed(2)}%)`}
        </span>
      </div>
      <div className="flex h-full w-full items-end justify-start gap-20">
        <div className="flex flex-col items-start">
          <span>{companyInfo.epsForward?.toFixed(2)}</span>
          <span className="text-muted-foreground">EPS</span>
        </div>
        <div className="flex flex-col items-start">
          <span>{companyInfo.forwardPE?.toFixed(2)}</span>
          <span className="text-muted-foreground">P/E</span>
        </div>
        <div className="flex flex-col items-start">
          <span>
            {Number(
              (companyInfo.marketCap && companyInfo.marketCap > 1000000
                ? companyInfo.marketCap / 1000000
                : companyInfo.marketCap ?? 0
              ).toFixed(0),
            ).toLocaleString()}
          </span>
          <span className="text-muted-foreground">Market Cap</span>
        </div>
      </div>
    </div>
  );
}
