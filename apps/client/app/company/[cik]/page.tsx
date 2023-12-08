import { findCompany, getCompanies } from '@money-meets-value/utils';
import { Suspense } from 'react';
import { Chart } from './components/chart/chart';
import { Description } from './components/description/description';
import { News } from './components/news/news';

export default async function Index({
  params = { cik: null },
}: {
  params: { cik: string | null };
}) {
  if (!params.cik) {
    throw new Error(`Didn't provide cik`);
  }

  const companies = await getCompanies();
  const ticker = findCompany(companies, 'ticker', params.cik)?.toString();

  if (!ticker) {
    throw new Error('Cant find company');
  }

  return (
    <div className="grid h-fit w-full grid-cols-3 gap-4 overflow-visible">
      <Suspense fallback={<div>Loading Chart...</div>}>
        <Chart ticker={ticker} />
      </Suspense>
      <Suspense fallback={<div>Loading Description...</div>}>
        <Description cik={params.cik} ticker={ticker} />
      </Suspense>
      <Suspense fallback={<div>Loading News...</div>}>
        <News ticker={ticker} />
      </Suspense>
    </div>
  );
}
