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
    <Table className="rounded-lg border">
      <TableHeader className="sticky top-0 backdrop-blur">
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
        {Object.keys(companyfacts.facts).map((deiOrUsGaap) => {
          type deiOrUsGaapKey = keyof typeof companyfacts.facts;

          return Object.keys(
            companyfacts.facts[deiOrUsGaap as deiOrUsGaapKey],
          ).map((factKey) => {
            return (
              <TableRow key={factKey}>
                <TableCell className="max-w-xs">
                  {companyfacts.facts[deiOrUsGaap as deiOrUsGaapKey][factKey]
                    .label ?? factKey}
                </TableCell>
                {tenLastYears.map((year) => {
                  const value = Object.keys(
                    companyfacts.facts[deiOrUsGaap as deiOrUsGaapKey][factKey]
                      .units,
                  ).map((unit) => {
                    const value = companyfacts.facts[
                      deiOrUsGaap as deiOrUsGaapKey
                    ][factKey].units[unit].find((filing) => {
                      if (!filing.frame) {
                        return false;
                      }
                      return (
                        filing.form.includes('K') &&
                        filing.frame.includes(year.toString()) &&
                        !(
                          filing.frame.includes('Q') &&
                          !filing.frame.includes('I')
                        )
                      );
                    })?.val;

                    if (value) {
                      const floatValue = parseFloat(
                        (value / 1000000).toFixed(2),
                      );
                      if (floatValue >= 0) {
                        return floatValue.toLocaleString();
                      }

                      return `(${Math.abs(floatValue).toLocaleString()})`;
                    }

                    return '-';
                  })[0];
                  return (
                    <TableCell
                      key={year}
                      className={
                        value.includes('(') ? 'text-destructive' : undefined
                      }
                    >
                      {value}
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
