import React from 'react'

export type TxErrorType = {
  rawError: Error;
  error: React.ReactNode | undefined;
};
