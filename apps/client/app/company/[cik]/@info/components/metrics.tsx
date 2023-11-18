import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';
import {
  compactFormatter,
  fractionFormatter,
  percentFormatter,
} from '../../../../../lib/utils';
import { Metric, RangeMetric } from './metric';

type Props = {
  companyInfo: Quote;
};

export const Metrics: React.FC<Props> = ({ companyInfo }) => {
  return (
    <div className="grid h-fit w-fit grid-flow-col grid-rows-[auto,auto,auto] items-start justify-end gap-5">
      <RangeMetric
        min={companyInfo.fiftyTwoWeekLow}
        max={companyInfo.fiftyTwoWeekHigh}
        value={companyInfo.regularMarketPrice}
        label="52 Week Range"
      />
      <RangeMetric
        min={companyInfo.regularMarketDayLow}
        max={companyInfo.regularMarketDayHigh}
        value={companyInfo.regularMarketPrice}
        label="Day Range"
      />
      <Metric
        label="EPS"
        value={companyInfo.epsForward}
        formatter={fractionFormatter}
      />
      <Metric
        label="P/E"
        value={companyInfo.forwardPE}
        formatter={fractionFormatter}
      />
      <Metric
        label="Market Cap"
        value={companyInfo.marketCap}
        formatter={compactFormatter}
      />
      <Metric
        label="Dividend Yield"
        value={companyInfo.dividendYield / 100}
        formatter={
          new Intl.NumberFormat(undefined, {
            ...percentFormatter.resolvedOptions(),
            signDisplay: 'never',
          })
        }
      />
      <Metric
        label="Dividend Rate"
        value={companyInfo.dividendRate}
        formatter={fractionFormatter}
      />
      <Metric
        label="Dividend Date"
        value={companyInfo.dividendDate}
        formatter={fractionFormatter}
      />
      <Metric
        label="Previous Close"
        value={companyInfo.regularMarketPreviousClose}
        formatter={fractionFormatter}
      />
    </div>
  );
};
