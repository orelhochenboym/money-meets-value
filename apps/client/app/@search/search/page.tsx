import {
  CompanyTickersExchange,
  CompanyTickersExchangeSchema,
} from '@money-meets-value/types';
import { fromZodError } from 'zod-validation-error';
import { ClientCommandItem } from '../../../components/command-item';
import SearchModal from '../../../components/search/search-modal';
import { Badge } from '../../../components/ui/badge';

const getCompanies = async () => {
  const companies: CompanyTickersExchange = await fetch(
    'https://www.sec.gov/files/company_tickers_exchange.json',
    { cache: 'no-cache' },
  ).then((res) => res.json());

  const results = CompanyTickersExchangeSchema.safeParse(companies);

  if (!results.success) {
    // TODO: toast
    console.log(fromZodError(results.error));
  }

  return companies.data
    .map((company) =>
      company
        .map((data, i) => {
          return { [companies.fields[i]]: data };
        })
        .reduce((acc, curr) => {
          acc[Object.keys(curr)[0]] = Object.values(curr)[0];
          return acc;
        }, {}),
    )
    .filter(
      (company, index, self) =>
        Object.keys(company).length === companies.fields.length &&
        index ===
          self.findIndex(
            (t) => Object.values(t)[0] === Object.values(company)[0],
          ),
    );
};

export default async function Index() {
  const companies = await getCompanies();

  return (
    <SearchModal id="search-modal">
      {companies.map((company) => {
        const values = Object.values(company);
        const cik = values[0]?.toString().padStart(10, '0');

        return (
          <ClientCommandItem
            key={cik}
            value={cik}
            className="flex cursor-pointer justify-between"
          >
            <div className="flex w-[20%] items-center justify-center">
              {values[2]}
            </div>

            <div className="flex w-[60%] items-center justify-center">
              {values[1]}
            </div>

            <Badge
              variant={values[3] ? 'outline' : 'destructive'}
              className="flex w-[20%] items-center justify-center"
            >
              {values[3] ? values[3].toString().toUpperCase() : 'N/A'}
            </Badge>
          </ClientCommandItem>
        );
      })}
    </SearchModal>
  );
}
