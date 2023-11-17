import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';

type Props = {
  companyInfo: Quote;
};

export const CompanyInfo: React.FC<Props> = ({ companyInfo }) => {
  return (
    <div className="flex w-fit h-full flex-col text-left">
      <h1 className="text-4xl font-bold whitespace-nowrap">
        {companyInfo.longName}
      </h1>
      <span className="text-muted-foreground flex gap-2">
        <span>{companyInfo.symbol}</span>
        <span>{companyInfo.region}</span>
        <span>{companyInfo.typeDisp}</span>
      </span>
      <h1 className="text-4xl font-bold">FIGI</h1>
    </div>
  );
};
