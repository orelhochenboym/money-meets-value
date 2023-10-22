'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
      <Button onClick={() => router.push('/')}>Home Page</Button>
    </div>
  );
}
