import Link, { LinkProps } from 'next/link';

type Props = { label: string };

export const NavLink: React.FC<LinkProps & Props> = (props) => {
  return (
    <Link
      className="border-background hover:border-muted-foreground border-b py-2 px-1 text-lg"
      {...props}
    >
      {props.label}
    </Link>
  );
};
