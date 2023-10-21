import Link from 'next/link';
import { Merriweather } from 'next/font/google';
import { Label } from './ui/label';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const Logo = () => (
  <Link href={'/'}>
    <Label
      className={`${merriweather.className} text-primary cursor-pointer select-none text-4xl font-bold`}
    >
      mmv
    </Label>
  </Link>
);
