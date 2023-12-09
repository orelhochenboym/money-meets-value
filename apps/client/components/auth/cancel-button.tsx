'use client';

import { useModal } from '@ebay/nice-modal-react';
import React from 'react';
import { Button } from '../ui/button';

type Props = { modalId: string };

export const CancelButton: React.FC<Props> = ({ modalId }) => {
  const modal = useModal(modalId);
  const closeModal = React.useCallback(() => {
    modal.hide();
  }, [modal]);

  return (
    <Button type="reset" variant="outline" onClick={closeModal}>
      Cancel
    </Button>
  );
};
