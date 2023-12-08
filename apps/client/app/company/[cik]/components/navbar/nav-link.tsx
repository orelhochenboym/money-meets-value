'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type Props = { label: string };

export const NavLink: React.FC<LinkProps & Props> = (props) => {
  const pathname = usePathname();
  return (
    <Link
      className={`border-background hover:border-muted-foreground border-b py-2 px-1 text-lg ${
        pathname === props.href.toString()
          ? 'text-primary border-primary hover:border-primary'
          : null
      }`}
      {...props}
    >
      {props.label}
    </Link>
  );
};
