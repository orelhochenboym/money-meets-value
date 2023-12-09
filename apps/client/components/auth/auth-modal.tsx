'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SignInOAuthButtons } from './sign-in-oauth-buttons';
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
      element: <SignUp modalId={modal.id} />,
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
        <Tabs defaultValue="sign-in" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {Object.values(tabs).map((tab) => {
              return (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <SignInOAuthButtons />

          <div className="flex w-full items-center justify-center gap-4">
            <div className="border-muted h-fit w-full border" />
            <div className="text-muted-foreground text-sm">or</div>
            <div className="border-muted h-fit w-full border" />
          </div>

          {Object.values(tabs).map((tab) => {
            return (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.element}
              </TabsContent>
            );
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
});
