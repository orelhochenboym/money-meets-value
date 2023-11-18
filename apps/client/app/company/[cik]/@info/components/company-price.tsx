import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';
import { decimalFormatter, percentFormatter } from '../../../../../lib/utils';

type Props = {
  companyInfo: Quote;
};

export const CompanyPrice: React.FC<Props> = ({ companyInfo }) => {
  return (
    <div className="flex h-fit w-fit items-end justify-start gap-2">
      <h1 className="text-4xl font-bold">
        {companyInfo.bid !== 0
          ? companyInfo.bid
          : companyInfo.regularMarketPrice}
      </h1>
      <span className="text text-sm font-bold leading-6">
        {companyInfo.currency}
      </span>
      <span
        className={`text-lg ${
          companyInfo.regularMarketChange && companyInfo.regularMarketChange > 0
            ? 'text-green-500'
            : 'text-destructive'
        }`}
      >
        {!companyInfo.regularMarketChange
          ? 'N/A'
          : decimalFormatter.format(companyInfo.regularMarketChange)}
      </span>
      <span
        className={`text-lg ${
          companyInfo.regularMarketChangePercent &&
          companyInfo.regularMarketChangePercent > 0
            ? 'text-green-500'
            : 'text-destructive'
        }`}
      >
        {`(${
          !companyInfo.regularMarketChangePercent
            ? 'N/A'
            : percentFormatter.format(
                companyInfo.regularMarketChangePercent / 100,
              )
        })`}
      </span>
    </div>
  );
};
