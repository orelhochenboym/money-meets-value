import { getCompanies } from '@money-meets-value/utils';
import yahooFinance from 'yahoo-finance2';
import { Chart } from '../../../components/chart';
import { Card } from '../../../components/ui/card';

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
    period1: 0,
    interval: '1mo',
  });

  return (
    <Card className="h-full w-full overflow-visible p-4">
      <Chart chart={companyChart}></Chart>
    </Card>
  );
}
