'use client';

import getYear from 'date-fns/getYear';
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
          ticks={chart.quotes.map((quote) => quote.date.getTime())}
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
