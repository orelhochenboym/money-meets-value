import { NavLink } from './nav-link';

type Props = { cik: string | null };

export const Navbar: React.FC<Props> = ({ cik }) => {
  const links = [
    { label: 'Summary', href: `/company/${cik}` },
    { label: 'Financials', href: `/company/${cik}/financials` },
    { label: 'Ratios', href: `/company/${cik}/ratios` },
    { label: 'Calculator', href: `/company/${cik}/calculators` },
    { label: 'News', href: `/company/${cik}/news` },
  ];

  return (
    <div className="text-muted-foreground border-accent flex h-fit w-full gap-5 border-b">
      {links.map((link) => (
        <NavLink {...link} key={link.label} />
      ))}
    </div>
  );
};
