import Link from 'next/link';
import { Card, CardContent } from '../../../components/ui/card';

export const Navbar = () => {
  return (
    <Card className="whitespace-nowrap">
      <CardContent className="h-full w-full p-0 py-2">
        <nav className="flex h-fit w-full flex-col justify-start text-start">
          <Link href="/profile" className="hover:bg-accent w-full py-2 px-6">
            General Info
          </Link>
          <Link
            href="/profile/holdings"
            className="hover:bg-accent w-full py-2 px-6"
          >
            Holdings
          </Link>
        </nav>
      </CardContent>
    </Card>
  );
};
