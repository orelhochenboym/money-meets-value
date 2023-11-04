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
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chart.quotes}>
        <defs>
          <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
          </linearGradient>
        </defs>
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
              const year = getYear(date);

              const restOfDaysOfMonth = chart.quotes
                .filter((quote) => {
                  const date = new Date(quote.date);
                  return getMonth(date) === month && getYear(date) === year;
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
        <YAxis domain={['auto', 'auto']} />
        <Tooltip
          formatter={(value, _name, _props) => {
            return [`${Number(value).toFixed(2)}`, 'Price'];
          }}
          itemStyle={{ color: 'hsl(var(--foreground))' }}
          labelFormatter={(label) => {
            return new Date(label).toLocaleDateString();
          }}
          labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
        />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#2563EB"
          fill="url(#price)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
