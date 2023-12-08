import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';
import {
  compactFormatter,
  fractionFormatter,
  percentFormatter,
} from '../../../../../lib/utils';
import { Metric, MetricProps, RangeMetric, RangeMetricProps } from './metric';

type Props = {
  companyInfo: Quote;
};

export const Metrics: React.FC<Props> = ({ companyInfo }) => {
  const rangeMetrics: RangeMetricProps[] = [
    {
      min: companyInfo.fiftyTwoWeekLow,
      max: companyInfo.fiftyTwoWeekHigh,
      value: companyInfo.regularMarketPrice,
      label: '52 Week Range',
    },
    {
      min: companyInfo.regularMarketDayLow,
      max: companyInfo.regularMarketDayHigh,
      value: companyInfo.regularMarketPrice,
      label: 'Day Range',
    },
  ];

  const metrics: MetricProps[] = [
    {
      value: companyInfo.epsForward,
      label: 'EPS',
      formatter: fractionFormatter,
    },
    {
      value: companyInfo.forwardPE,
      label: 'P/E',
      formatter: fractionFormatter,
    },
    {
      value: companyInfo.marketCap,
      label: 'Market Cap',
      formatter: compactFormatter,
    },
    {
      value: companyInfo.dividendYield / 100,
      label: 'Dividend Yield',
      formatter: new Intl.NumberFormat(undefined, {
        ...percentFormatter.resolvedOptions(),
        signDisplay: 'never',
      }),
    },
    {
      value: companyInfo.dividendRate,
      label: 'Dividend Rate',
      formatter: fractionFormatter,
    },
    {
      value: companyInfo.dividendDate,
      label: 'Dividend Date',
      formatter: fractionFormatter,
    },
    {
      value: companyInfo.regularMarketPreviousClose,
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
