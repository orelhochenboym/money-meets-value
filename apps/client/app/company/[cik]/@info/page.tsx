import { findCompany, getCompanies } from '@money-meets-value/utils';
import { Suspense } from 'react';
import { Breadcrumbs } from './components/breadcrumbs';
import { CompanyInfo } from './components/company-info';
import { CompanyLogo } from './components/company-logo';
import { CompanyPrice } from './components/company-price';
import { Metrics } from './components/metrics';

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
    throw new Error('No Company Found');
  }

  return (
    <div className=" flex h-fit w-full flex-col justify-between gap-4">
      <Suspense fallback={<div>Loading Breadcrumbs...</div>}>
        <Breadcrumbs ticker={ticker} />
      </Suspense>
      <div className="flex h-fit w-full justify-between">
        <div className="flex h-fit w-fit flex-col">
          <div className="flex h-fit w-full items-center justify-start gap-2">
            <Suspense fallback={<div>Loading Logo...</div>}>
              <CompanyLogo ticker={ticker} />
            </Suspense>
            <Suspense fallback={<div>Loading Company Info...</div>}>
              <CompanyInfo ticker={ticker} />
            </Suspense>
          </div>
          <CompanyPrice ticker={ticker} />
        </div>
        <Metrics ticker={ticker} />
      </div>
    </div>
  );
}
