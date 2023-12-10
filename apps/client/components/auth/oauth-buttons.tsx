'use client';

import { useSignIn } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/nextjs/dist/types/server';
import Image from 'next/image';
import { Button } from '../ui/button';

export const OAuthButtons = () => {
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    });
  };
  return (
    <div className="flex h-fit w-fit flex-col gap-2">
      <Button
        onClick={() => signInWith('oauth_google')}
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
      <Button
        onClick={() => signInWith('oauth_github')}
        variant="outline"
        className="flex w-full items-center justify-center gap-2"
      >
        <Image
          src="https://img.clerk.com/static/github.svg"
          width="20"
          height="20"
          alt="Continue with GitHub"
          className="flex items-center justify-center"
        />
        Continue with GitHub
      </Button>
      <Button
        onClick={() => signInWith('oauth_apple')}
        variant="outline"
        className="flex w-full items-center justify-center gap-2"
      >
        <Image
          src="https://img.clerk.com/static/apple.svg"
          width="20"
          height="20"
          alt="Continue with Apple"
          className="flex items-center justify-center"
        />
        Continue with Apple
      </Button>
    </div>
  );
};
