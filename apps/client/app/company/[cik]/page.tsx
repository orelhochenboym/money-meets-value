import { findCompany, getCompanies } from '@money-meets-value/utils';
import yahooFinance from 'yahoo-finance2';
import { Chart } from '../../../components/chart';
import { Card } from '../../../components/ui/card';
import { CompanyDescription } from './components/company-description';
import { CompanyNews } from './components/company-news';

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
      <CompanyDescription cik={params.cik} quoteSummary={quoteSummary} />
      <CompanyNews search={search} />
    </div>
  );
}
