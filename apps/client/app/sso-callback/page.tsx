'use client';

import {
  AuthenticateWithRedirectCallback,
  useClerk,
  useSignIn,
} from '@clerk/nextjs';

export default async function Index() {
  const { client, loaded } = useClerk();
  const { setActive, isLoaded } = useSignIn();

  if (!loaded) {
    return null;
  }

  const userExistsButNeedsToSignIn =
    client.signUp.verifications.externalAccount.status === 'transferable' &&
    client.signUp.verifications.externalAccount.error?.code ===
      'external_account_exists';

  if (userExistsButNeedsToSignIn) {
    const res = await client.signIn.create({ transfer: true });
    if (res.status === 'complete' && isLoaded) {
      setActive({ session: res.createdSessionId });
    }
  }
  return <AuthenticateWithRedirectCallback />;
}
