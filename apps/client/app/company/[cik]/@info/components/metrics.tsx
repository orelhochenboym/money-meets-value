import yahooFinance from 'yahoo-finance2';
import {
  compactFormatter,
  fractionFormatter,
  percentFormatter,
} from '../../../../../lib/utils';
import { Metric, MetricProps, RangeMetric, RangeMetricProps } from './metric';

type Props = {
  ticker: string;
};

export const Metrics: React.FC<Props> = async ({ ticker }) => {
  const quote = await yahooFinance.quote(ticker);

  const rangeMetrics: RangeMetricProps[] = [
    {
      min: quote.fiftyTwoWeekLow,
      max: quote.fiftyTwoWeekHigh,
      value: quote.regularMarketPrice,
      label: '52 Week Range',
    },
    {
      min: quote.regularMarketDayLow,
      max: quote.regularMarketDayHigh,
      value: quote.regularMarketPrice,
      label: 'Day Range',
    },
  ];

  const metrics: MetricProps[] = [
    {
      value: quote.epsForward,
      label: 'EPS',
      formatter: fractionFormatter,
    },
    {
      value: quote.forwardPE,
      label: 'P/E',
      formatter: fractionFormatter,
    },
    {
      value: quote.marketCap,
      label: 'Market Cap',
      formatter: compactFormatter,
    },
    {
      value: quote.dividendYield / 100,
      label: 'Dividend Yield',
      formatter: new Intl.NumberFormat(undefined, {
        ...percentFormatter.resolvedOptions(),
        signDisplay: 'never',
      }),
    },
    {
      value: quote.dividendRate,
      label: 'Dividend Rate',
      formatter: fractionFormatter,
    },
    {
      value: quote.dividendDate,
      label: 'Dividend Date',
      formatter: fractionFormatter,
    },
    {
      value: quote.regularMarketPreviousClose,
      label: 'Previous Close',
      formatter: fractionFormatter,
    },
  ];

  return (
    <div className="grid h-fit w-fit grid-flow-col grid-rows-[auto,auto,auto] items-start justify-end gap-5">
      {rangeMetrics.map((rangeMetric) => (
        <RangeMetric {...rangeMetric} key={rangeMetric.label} />
      ))}
      {metrics.map((metric) => (
        <Metric {...metric} key={metric.label} />
      ))}
    </div>
  );
};
