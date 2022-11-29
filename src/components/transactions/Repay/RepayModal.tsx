import { Trans } from '@lingui/macro';
import React from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { RepayModalContent } from './RepayModalContent';

export const RepayModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;

  return (
    <BasicModal open={type === ModalType.Repay} setOpen={close}>
      <ModalWrapper
        title={<Trans>Repay</Trans>}
        underlyingAsset={args.underlyingAsset}
      >
        {(params) => {
          return (
            <RepayModalContent {...params} />
          );
        }}
      </ModalWrapper>
    </BasicModal>
  );
};
