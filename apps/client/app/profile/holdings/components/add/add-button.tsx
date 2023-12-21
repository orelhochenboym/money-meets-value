'use client';

import { useModal } from '@ebay/nice-modal-react';
import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from '../../../../../components/ui/button';

type Props = { modalId: string };

export const AddButton: React.FC<Props> = ({ modalId }) => {
  const modal = useModal(modalId);
  const openModal = React.useCallback(() => {
    modal.show();
  }, [modal]);

  return (
    <Button
      variant="outline"
      className="flex h-fit w-fit gap-2"
      onClick={openModal}
    >
      <Plus />
      <span>Add Holding</span>
    </Button>
  );
};
