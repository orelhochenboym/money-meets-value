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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          {tenLastYears.map((year) => (
            <TableHead key={year} className="text-center">
              {year}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(companyfacts.facts).map((taxonomy) => {
          type factsKey = keyof typeof companyfacts.facts;

          return Object.keys(companyfacts.facts[taxonomy as factsKey]).map(
            (key, i) => {
              return (
                <TableRow key={i} className="bg-red-50">
                  <TableCell className="bg-red-100">
                    {companyfacts.facts[taxonomy as factsKey][key].label ?? key}
                  </TableCell>
                  {tenLastYears.map((year) => {
                    return Object.keys(
                      companyfacts.facts[taxonomy as factsKey][key].units,
                    ).map((unitKey) => {
                      return (
                        <TableCell key={unitKey} className="bg-blue-50">
                          {parseFloat(
                            (
                              (companyfacts.facts[taxonomy as factsKey][
                                key
                              ].units[unitKey].find((fact) => {
                                return (
                                  fact.form.includes('K') &&
                                  fact.frame?.includes(year.toString())
                                );
                              })?.val ?? 0) / 1000000
                            ).toFixed(2),
                          ).toLocaleString() ?? 'N/A'}
                        </TableCell>
                      );
                    });
                  })}
                </TableRow>
              );
            },
          );
        })}
      </TableBody>
    </Table>
  );
}
