import yahooFinance from 'yahoo-finance2';
import { Card } from '../../../../../components/ui/card';
import { ClientChart } from './client-chart';

type Props = { ticker: string };

export const Chart: React.FC<Props> = async ({ ticker }) => {
  const chart = await yahooFinance.chart(ticker, {
    period1: 0,
    interval: '1mo',
  });

  return (
    <Card className="col-span-3 h-96 w-full overflow-visible p-4">
      <ClientChart chart={chart} />
    </Card>
  );
};
