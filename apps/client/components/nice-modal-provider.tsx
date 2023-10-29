'use client';

import React, { PropsWithChildren } from 'react';
import NiceModal from '@ebay/nice-modal-react';

export const NiceModalProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return <NiceModal.Provider>{children}</NiceModal.Provider>;
};
