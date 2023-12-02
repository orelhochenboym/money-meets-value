import { findCompany, getCompanies } from '@money-meets-value/utils';
import { formatDistanceToNowStrict } from 'date-fns';
import Link from 'next/link';
import yahooFinance from 'yahoo-finance2';
import { fractionFormatter } from '../../../../client/lib/utils';
import { Chart } from '../../../components/chart';
import { Card, CardContent } from '../../../components/ui/card';

export default async function Index({ params }: { params: { cik: string } }) {
  const companies = await getCompanies();
  const ticker = findCompany(companies, 'ticker', params.cik)?.toString();

  if (!ticker) {
    throw new Error('Cant find company');
  }

  const companyChart = await yahooFinance.chart(ticker, {
    period1: 0,
    interval: '1mo',
  });

  const quoteSummary = await yahooFinance.quoteSummary(ticker, {
    modules: [
      'assetProfile',
      'calendarEvents',
      'defaultKeyStatistics',
      'earningsTrend',
      'financialData',
      'fundOwnership',
      'fundPerformance',
      'fundProfile',
      'insiderHolders',
      'insiderTransactions',
      'institutionOwnership',
      'majorHoldersBreakdown',
      'price',
      'quoteType',
      'summaryDetail',
      'topHoldings',
    ],
  });

  const search = await yahooFinance.search(ticker, {
    newsCount: 99999,
  });

  return (
    <div className="grid h-fit w-full grid-cols-3 gap-4 overflow-visible">
      <Card className="col-span-3 h-fit w-full overflow-visible p-4">
        <div className="h-96 w-full">
          <Chart chart={companyChart} />
        </div>
      </Card>
      <Card className="col-span-2 h-full w-full">
        <div className="flex h-fit w-full justify-start border-b p-2 font-medium">
          Company Description
        </div>
        <CardContent className="grid grid-flow-row grid-cols-[auto,auto,auto,auto] gap-4 p-4">
          <div className="flex flex-col items-start gap-1 text-start">
            <dt className="text-muted-foreground text-sm font-medium">CEO</dt>
            <dd className="text-sm">
              {quoteSummary.assetProfile?.companyOfficers.find((officer) =>
                officer.title.toUpperCase().includes('CEO'),
              )?.name ?? 'N/A'}
            </dd>
          </div>
          <div className="flex flex-col items-start gap-1 text-start">
            <dt className="text-muted-foreground text-sm font-medium">
              Full-Time Employees
            </dt>
            <dd className="text-sm">
              {fractionFormatter.format(
                quoteSummary.assetProfile?.fullTimeEmployees ?? NaN,
              )}
            </dd>
          </div>
          <div className="flex flex-col items-start gap-1 text-start">
            <dt className="text-muted-foreground text-sm font-medium">
              Sector
            </dt>
            <dd className="text-sm">{quoteSummary.assetProfile?.sectorDisp}</dd>
          </div>
          <div className="flex flex-col items-start gap-1 text-start">
            <dt className="text-muted-foreground text-sm font-medium">
              Industry
            </dt>
            <dd className="text-sm">
              {quoteSummary.assetProfile?.industryDisp}
            </dd>
          </div>
          <div className="flex flex-col items-start gap-1 text-start">
            <dt className="text-muted-foreground text-sm font-medium">
              Address
            </dt>
            <dd className="text-sm">
              {quoteSummary.assetProfile?.address1 ??
                quoteSummary.assetProfile?.address2 ??
                quoteSummary.assetProfile?.address3}
            </dd>
          </div>
          <div className="flex flex-col items-start gap-1 text-start">
            <dt className="text-muted-foreground text-sm font-medium">
              IPO Date
            </dt>
            <dd className="text-sm">
              {quoteSummary.assetProfile?.industryDisp}
            </dd>
          </div>
          <div className="flex flex-col items-start gap-1 text-start">
            <dt className="text-muted-foreground text-sm font-medium">CIK</dt>
            <dd className="text-sm">{params.cik}</dd>
          </div>
          <div className="flex flex-col items-start gap-1 text-start">
            <dt className="text-muted-foreground text-sm font-medium">
              Website
            </dt>
            <Link
              href={quoteSummary.assetProfile?.website ?? ''}
              className="text-sm"
              rel="noopener noreferrer"
              target="_blank"
            >
              {quoteSummary.assetProfile?.website}
            </Link>
          </div>
          <div className="col-span-full flex flex-col items-start gap-1 text-start">
            <dt className="text-muted-foreground text-sm font-medium">
              Business Summary
            </dt>
            <dd className="columns-2 gap-8 text-justify text-sm">
              {quoteSummary.assetProfile?.longBusinessSummary}
            </dd>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2 h-full w-full">
        <div className="flex h-fit w-full justify-start border-b p-2 font-medium">
          Company News
        </div>
        <CardContent className="grid grid-flow-row auto-rows-fr grid-cols-3 gap-4 p-4">
          {search.news
            .sort(
              (a, b) =>
                b.providerPublishTime.getTime() -
                a.providerPublishTime.getTime(),
            )
            .map((news) => {
              return (
                <Link
                  className="hover:bg-accent flex w-full flex-col gap-2 rounded-lg p-4 text-start focus-within:outline-none focus-within:ring-2 focus-within:ring-inset"
                  key={news.uuid}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={news.link}
                >
                  <div className="text-muted-foreground flex h-fit w-full justify-between text-xs font-medium">
                    <span className="flex-1">{news.publisher}</span>
                    <span className="shrink-0">{`${formatDistanceToNowStrict(
                      news.providerPublishTime,
                    )} ago`}</span>
                  </div>
                  <p className="line-clamp-2 w-full font-medium">
                    {news.title}
                  </p>
                </Link>
              );
            })}
        </CardContent>
      </Card>
    </div>
  );
}
