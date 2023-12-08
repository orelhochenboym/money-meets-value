import yahooFinance from 'yahoo-finance2';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../../components/ui/avatar';

type Props = {
  ticker: string;
};

export const CompanyLogo: React.FC<Props> = async ({ ticker }) => {
  const quoteSummary = await yahooFinance.quoteSummary(ticker, {
    modules: ['assetProfile'],
  });

  return (
    <div className="aspect-square h-1/4 w-1/4">
      <Avatar className="inline-flex h-full w-full max-w-full select-none items-center justify-center overflow-hidden border align-middle ">
        <AvatarImage
          className="object-contain"
          src={`https://www.google.com/s2/favicons?domain=${quoteSummary.assetProfile?.website}&sz=128`}
        />
        <AvatarFallback>{ticker}</AvatarFallback>
      </Avatar>
    </div>
  );
};
