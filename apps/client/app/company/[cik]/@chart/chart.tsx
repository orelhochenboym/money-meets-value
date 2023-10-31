'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartResultArray } from 'yahoo-finance2/dist/esm/src/modules/chart';

type Props = { chart: ChartResultArray };

export const Chart: React.FC<Props> = ({ chart }) => {
  console.log(
    chart.quotes
      .filter((quote) => {
        const date = new Date(quote.date);
        return date.getMonth() % 3 === 0 && date.getDay() === 1;
      })
      .map((quote) => new Date(quote.date).toLocaleDateString()),
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={chart.quotes}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
          ticks={chart.quotes
            .filter((quote) => {
              const date = new Date(quote.date);
              return date.getMonth() % 3 === 0 && date.getDay() === 1;
            })
            .map((quote) => new Date(quote.date).toISOString())}
        />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
