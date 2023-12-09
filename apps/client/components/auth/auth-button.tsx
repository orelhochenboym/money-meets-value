'use client';

import { useModal } from '@ebay/nice-modal-react';
import React from 'react';
import { Button } from '../ui/button';

type Props = { modalId: string };

export const AuthButton: React.FC<Props> = ({ modalId }) => {
  const modal = useModal(modalId);
  const openModal = React.useCallback(() => {
    modal.show();
  }, [modal]);

  return (
    <Button variant="default" onClick={openModal}>
      Sign In
    </Button>
  );
};
