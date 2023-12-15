import { Card, CardContent } from '../../../components/ui/card';
import { NavLink } from './nav-link';

export const Navbar = () => {
  const links = [
    { label: 'General Info', href: `/profile` },
    { label: 'Holdings', href: `/profile/holdings` },
  ];

  return (
    <Card className="whitespace-nowrap">
      <CardContent className="h-full w-full p-0 py-2">
        <nav className="flex h-fit w-full flex-col justify-start gap-2 text-start">
          {links.map((link) => (
            <NavLink {...link} key={link.label} />
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};
