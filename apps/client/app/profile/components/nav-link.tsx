'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type Props = { label: string };

export const NavLink: React.FC<LinkProps & Props> = (props) => {
  const pathname = usePathname();
  return (
    <Link
      className={`hover:bg-accent w-full py-2 px-6 ${
        pathname === props.href.toString() ? 'bg-accent' : null
      }`}
      {...props}
    >
      {props.label}
    </Link>
  );
};
