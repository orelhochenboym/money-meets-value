'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../../../components/ui/button';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    return;
  }, [error]);

  const router = useRouter();
  const cik = usePathname().split('/').slice(-1)[0];

  return (
    <div className="flex flex-col items-center justify-center">
      {`Sorry, we couldn't find the company related to provided cik: ${cik}`}
      <Button onClick={() => router.replace('/')}>Home Page</Button>
    </div>
  );
}
