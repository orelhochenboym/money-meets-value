import { NavLink } from './nav-link';

type Props = { cik: string };

export const Navbar: React.FC<Props> = ({ cik }) => {
  return (
    <div className="text-muted-foreground flex h-fit w-fit gap-5">
      <NavLink label="Summary" href="" />
      <NavLink label="Financials" href={`${cik}/financials`} />
      <NavLink label="Ratios" href={`${cik}/ratios`} />
      <NavLink label="Calculators" href={`${cik}/calculators`} />
      <NavLink label="News" href={`${cik}/news`} />
    </div>
  );
};
