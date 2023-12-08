import { QuoteSummaryResult } from 'yahoo-finance2/dist/esm/src/modules/quoteSummary-iface';
import { Card, CardContent } from '../../../../components/ui/card';
import { fractionFormatter } from '../../../../lib/utils';
import { CompanyDescriptionItem } from './company-description-item';

type Props = { quoteSummary: QuoteSummaryResult; cik: string };

export const CompanyDescription: React.FC<Props> = ({ quoteSummary, cik }) => {
  const companyDescriptionItems = [
    {
      label: 'CEO',
      value: quoteSummary.assetProfile?.companyOfficers.find((officer) =>
        officer.title.toUpperCase().includes('CEO'),
      )?.name,
    },
    {
      label: 'Full-Time Employees',
      value: fractionFormatter.format(
        quoteSummary.assetProfile?.fullTimeEmployees ?? NaN,
      ),
    },
    {
      label: 'Sector',
      value: quoteSummary.assetProfile?.sectorDisp,
    },
    {
      label: 'Industry',
      value: quoteSummary.assetProfile?.industryDisp,
    },
    {
      label: 'Address',
      value:
        quoteSummary.assetProfile?.address1 ??
        quoteSummary.assetProfile?.address2 ??
        quoteSummary.assetProfile?.address3industryDisp,
    },
    {
      label: 'CIK',
      value: cik,
    },
    {
      label: 'Website',
      value: quoteSummary.assetProfile?.website,
    },
  ];

  return (
    <Card className="col-span-2 h-full w-full">
      <div className="flex h-fit w-full justify-start border-b p-2 font-medium">
        Company Description
      </div>
      <CardContent className="grid grid-flow-row grid-cols-[auto,auto,auto,auto] gap-4 p-4">
        {companyDescriptionItems.map((item) => (
          <CompanyDescriptionItem {...item} key={item.label} />
        ))}
        <div className="col-span-full flex flex-col items-start gap-1 text-start">
          <dt className="text-muted-foreground text-sm font-medium">
            Business Summary
          </dt>
          <dd className="columns-2 gap-8 text-justify text-sm">
            {quoteSummary.assetProfile?.longBusinessSummary}
          </dd>
        </div>
      </CardContent>
    </Card>
  );
};
