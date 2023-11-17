import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';
import { SearchResult } from 'yahoo-finance2/dist/esm/src/modules/search';
import { Breadcrumbs } from './components/breadcrumbs';
import { CompanyInfo } from './components/company-info';
import { CompanyLogo } from './components/company-logo';
import { CompanyPrice } from './components/company-price';
import { Metrics } from './components/metrics';

const getCompanyQuote = async (cik: string) => {
  const companyInfo: Quote = await fetch(
    `http://localhost:3000/api/quote/${cik}`,
    {
      cache: 'no-cache',
    },
  ).then((res) => res.json());

  return companyInfo;
};
const getCompanySearch = async (symbol: string) => {
  const companySearch: SearchResult = await fetch(
    `http://localhost:3000/api/search/${symbol}`,
    {
      cache: 'no-cache',
    },
  ).then((res) => res.json());

  return companySearch;
};

export default async function Index({ params }: { params: { cik: string } }) {
  const companyInfo = await getCompanyQuote(params.cik);
  const companySearch = await getCompanySearch(companyInfo.symbol);
  const foundCompanySearch = companySearch.quotes.find(
    (quote) => companyInfo.symbol === quote.symbol,
  );

  return (
    <div className="flex flex-col h-1/3 w-full border-b border-accent gap-2">
      <Breadcrumbs
        items={[
          foundCompanySearch?.exchDisp,
          foundCompanySearch?.sector,
          foundCompanySearch?.industry,
        ]}
      />
      <div className="w-full h-full flex">
        <div className="flex flex-col w-fit h-full">
          <div className="flex h-fit w-fit gap-2">
            <CompanyLogo companyInfo={companyInfo} />
            <CompanyInfo companyInfo={companyInfo} />
          </div>
          <CompanyPrice companyInfo={companyInfo} />
        </div>
        <Metrics companyInfo={companyInfo} />
      </div>
    </div>
  );
}
