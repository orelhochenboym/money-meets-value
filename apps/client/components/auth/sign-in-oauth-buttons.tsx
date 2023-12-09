'use client';

import { useSignIn } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/nextjs/dist/types/server';
import Image from 'next/image';
import { Button } from '../ui/button';

export const SignInOAuthButtons = () => {
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    });
  };
  return (
    <div className="w-full">
      <Button
        onClick={() => signInWith('oauth_google')}
        variant="outline"
        className="flex items-center justify-center"
      >
        <Image
          src="https://img.clerk.com/static/google.svg"
          width="20"
          height="20"
          alt="Continue with Google"
          className="flex items-center justify-center"
        />
      </Button>
    </div>
  );
};
