'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { OAuthButtons } from './oauth-buttons';
import { SignIn } from './sign-in';
import { SignUp } from './sign-up';

export const AuthModal = NiceModal.create(() => {
  const modal = useModal();
  const closeModal = React.useCallback(() => {
    modal.hide();
  }, [modal]);

  const tabs = {
    signIn: {
      value: 'sign-in',
      label: 'Sign In',
      element: <SignIn modalId={modal.id} />,
    },
    signUp: {
      value: 'sign-up',
      label: 'Sign Up',
      element: <SignUp modalId={modal.id} />,
    },
  };

  return (
    <Dialog open={modal.visible} onOpenChange={closeModal}>
      <DialogContent>
        <Tabs
          defaultValue="sign-in"
          className="flex w-full flex-col items-center justify-center gap-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            {Object.values(tabs).map((tab) => {
              return (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <OAuthButtons />

          <div className="flex w-full items-center justify-center gap-4">
            <div className="border-muted h-fit w-full border" />
            <div className="text-muted-foreground text-sm">or</div>
            <div className="border-muted h-fit w-full border" />
          </div>

          {Object.values(tabs).map((tab) => {
            return (
              <TabsContent key={tab.value} value={tab.value} className="w-3/4">
                {tab.element}
              </TabsContent>
            );
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
});
