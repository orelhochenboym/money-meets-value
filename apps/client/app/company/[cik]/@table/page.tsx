import { CompanyFacts, CompanyFactsSchema } from '@money-meets-value/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';
import { fromZodError } from 'zod-validation-error';

const getCompanyFacts = async (cik: string) => {
  const companyfacts: CompanyFacts = await fetch(
    `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`,
    { cache: 'no-cache' },
  ).then((res) => res.json());

  const results = CompanyFactsSchema.safeParse(companyfacts);

  if (!results.success) {
    // TODO: toast
    console.log(fromZodError(results.error));
  }

  return companyfacts;
};

export default async function Index({ params }: { params: { cik: string } }) {
  const companyfacts = await getCompanyFacts(params.cik);
  const tenLastYears = [...Array(10).keys()].map(
    (_, i) => new Date().getFullYear() - 1 - i,
  );

  return (
    <Table className="bg-blue-300">
      <TableHeader>
        <TableRow>
          <TableHead className="bg-red-200">Metric</TableHead>
          {tenLastYears.map((year) => (
            <TableHead key={year} className="text-center">
              {year}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(companyfacts.facts).map((deiOrUsGaap) => {
          type deiOrUsGaapKey = keyof typeof companyfacts.facts;

          return Object.keys(
            companyfacts.facts[deiOrUsGaap as deiOrUsGaapKey],
          ).map((factKey) => {
            return (
              <TableRow key={factKey}>
                <TableCell className="max-w-min bg-red-50">
                  {companyfacts.facts[deiOrUsGaap as deiOrUsGaapKey][factKey]
                    .label ?? factKey}
                </TableCell>
                {tenLastYears.map((year) => {
                  return (
                    <TableCell key={year}>
                      {Object.keys(
                        companyfacts.facts[deiOrUsGaap as deiOrUsGaapKey][
                          factKey
                        ].units,
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          });
        })}
      </TableBody>
    </Table>
  );
}
