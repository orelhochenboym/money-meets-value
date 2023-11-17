import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../../components/ui/avatar';

type Props = {
  companyInfo: Quote;
};

export const CompanyLogo: React.FC<Props> = ({ companyInfo }) => {
  return (
    <div className="h-full aspect-square">
      <Avatar className="h-full inline-flex w-full max-w-full select-none items-center justify-center overflow-hidden border align-middle ">
        <AvatarImage className="object-contain" />
        <AvatarFallback>{companyInfo.symbol}</AvatarFallback>
      </Avatar>
    </div>
  );
};
