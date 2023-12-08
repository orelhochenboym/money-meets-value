import { NavLink } from './nav-link';

type Props = { cik: string | null };

export const Navbar: React.FC<Props> = ({ cik }) => {
  const links = [
    { label: 'Summary', href: '' },
    { label: 'Financials', href: `${cik}/financials` },
    { label: 'Ratios', href: `${cik}/ratios` },
    { label: 'Calculator', href: `${cik}/calculators` },
    { label: 'News', href: `${cik}/news` },
  ];
  return (
    <div className="text-muted-foreground flex h-fit w-fit gap-5">
      {links.map((link) => (
        <NavLink {...link} key={link.label} />
      ))}
    </div>
  );
};
