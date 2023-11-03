'use client';

import { getMonth, getYear, isEqual, min } from 'date-fns';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartResultArray } from 'yahoo-finance2/dist/esm/src/modules/chart';

type Props = { chart: ChartResultArray };

export const Chart: React.FC<Props> = ({ chart }) => {
  return (
    // Ratio of 3.04
    <ResponsiveContainer width={760} height={250}>
      <AreaChart data={chart.quotes}>
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value);
            const year = getYear(date);
            const month = date.toLocaleString('default', { month: 'short' });

            return `${month} ${year}`;
          }}
          ticks={chart.quotes
            .filter((quote) => {
              const date = new Date(quote.date);
              const month = getMonth(date);

              const restOfDaysOfMonth = chart.quotes
                .filter((quote) => {
                  return getMonth(new Date(quote.date)) === month;
                })
                .map((quote) => new Date(quote.date));

              const minTradingDateOfMonth = min(restOfDaysOfMonth);

              return (
                getMonth(date) % 2 === 0 && isEqual(date, minTradingDateOfMonth)
              );
            })
            .map((quote) => {
              const date = new Date(quote.date);
              return date.toISOString();
            })}
        />
        <YAxis domain={['dataMin', 'auto']} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          fill="#8884d8"
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
