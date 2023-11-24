import { getCompanies } from '@money-meets-value/utils';
import yahooFinance from 'yahoo-finance2';
import { Breadcrumbs } from './components/breadcrumbs';
import { CompanyInfo } from './components/company-info';
import { CompanyLogo } from './components/company-logo';
import { CompanyPrice } from './components/company-price';
import { Metrics } from './components/metrics';
import { Navbar } from './components/navbar';

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

  const quote = await yahooFinance.quote(ticker);
  const search = await yahooFinance.search(quote.symbol);

  const foundCompanySearch = search.quotes.find(
    (searchQuote) => quote.symbol === searchQuote.symbol,
  );

  return (
    <div className="border-accent flex h-fit w-full flex-col justify-between gap-4 border-b">
      <Breadcrumbs
        items={[
          foundCompanySearch?.exchDisp,
          foundCompanySearch?.sector,
          foundCompanySearch?.industry,
        ]}
      />
      <div className="flex h-fit w-full justify-between">
        <div className="flex h-fit w-fit flex-col">
          <div className="flex h-fit w-full items-center justify-start gap-2">
            <CompanyLogo companyInfo={quote} />
            <CompanyInfo companyInfo={quote} />
          </div>
          <CompanyPrice companyInfo={quote} />
        </div>
        <Metrics companyInfo={quote} />
      </div>
      <Navbar cik={params.cik} />
    </div>
  );
}
