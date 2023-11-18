'use client';

import NiceModal from '@ebay/nice-modal-react';
import React, { PropsWithChildren } from 'react';

export const NiceModalProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return <NiceModal.Provider>{children}</NiceModal.Provider>;
};
