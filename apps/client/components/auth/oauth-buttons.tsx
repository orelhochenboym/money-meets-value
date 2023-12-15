'use client';

import { useSignUp } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/nextjs/dist/types/server';
import Image from 'next/image';
import { Button } from '../ui/button';

export const OAuthButtons = () => {
  const { signUp } = useSignUp();

  const handleSignUp = async (strategy: OAuthStrategy) => {
    return signUp?.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  return (
    <div className="flex h-fit w-fit flex-col gap-2">
      <Button
        onClick={() => handleSignUp('oauth_google')}
        variant="outline"
        className="flex w-full items-center justify-center gap-2"
      >
        <Image
          src="https://img.clerk.com/static/google.svg"
          width="20"
          height="20"
          alt="Continue with Google"
          className="flex items-center justify-center"
        />
        Continue with Google
      </Button>
    </div>
  );
};
