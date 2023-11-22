import { getCompanies } from '@money-meets-value/utils';
import yahooFinance from 'yahoo-finance2';
import { Chart } from './chart';

export default async function Index({ params }: { params: { cik: string } }) {
  const companies = await getCompanies();
  const relatedCompany = companies.find((company) => {
    for (const key in company) {
      if (company[key] !== Number(params.cik)) {
        continue;
      }
      return true;
    }
  });

  if (!relatedCompany) {
    throw new Error('No company found');
  }

  const ticker =
    relatedCompany[
      Object.keys(relatedCompany).find((key) => key === 'ticker') ?? ''
    ]?.toString() ?? '';

  const companyChart = await yahooFinance.chart(ticker, {
    period1: 1667236413,
  });

  return (
    <div className="h-full w-1/2">
      <Chart chart={companyChart} />
    </div>
  );
}
