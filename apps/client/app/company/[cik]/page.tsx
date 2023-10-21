import { CompanyFacts, CompanyFactsSchema } from '@money-meets-value/types';
import { fromZodError } from 'zod-validation-error';

const getCompanyFacts = async (cik: string) => {
  const companyfacts: CompanyFacts = await fetch(
    `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`,
    { cache: 'no-cache' },
  ).then((res) => res.json());

  const results = CompanyFactsSchema.safeParse(companyfacts);

  if (!results.success) {
    console.log(fromZodError(results.error));
  }

  return companyfacts;
};

export default async function Index({ params }: { params: { cik: string } }) {
  const companyfacts: { cik: number; entityName: string } =
    await getCompanyFacts(params.cik);

  return (
    <div className="h-full w-full border-2 border-green-400">
      {companyfacts.entityName}
    </div>
  );
}
