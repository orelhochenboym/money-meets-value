import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';
import { QuoteSummaryResult } from 'yahoo-finance2/dist/esm/src/modules/quoteSummary-iface';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../../components/ui/avatar';

type Props = {
  quote: Quote;
  quoteSummary: QuoteSummaryResult;
};

export const CompanyLogo: React.FC<Props> = ({ quote, quoteSummary }) => {
  return (
    <div className="aspect-square h-1/4 w-1/4">
      <Avatar className="inline-flex h-full w-full max-w-full select-none items-center justify-center overflow-hidden border align-middle ">
        <AvatarImage
          className="object-contain"
          src={`https://www.google.com/s2/favicons?domain=${quoteSummary.assetProfile?.website}&sz=128`}
        />
        <AvatarFallback>{quote.symbol}</AvatarFallback>
      </Avatar>
    </div>
  );
};
