import { ChartResultArray } from 'yahoo-finance2/dist/esm/src/modules/chart';
import { Chart } from './chart';

const getCompanyChart = async (cik: string) => {
  const companyChart: ChartResultArray = await fetch(
    `http://localhost:3000/api/chart/${cik}`,
    {
      cache: 'no-cache',
    },
  ).then((res) => res.json());

  return companyChart;
};

export default async function Index({ params }: { params: { cik: string } }) {
  const companyChart = await getCompanyChart(params.cik);

  return (
    <div className="w-1/2 h-full">
      <Chart chart={companyChart} />
    </div>
  );
}
