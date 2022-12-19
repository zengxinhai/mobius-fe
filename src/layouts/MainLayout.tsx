import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

import { AppHeader } from './AppHeader';
import {NetworkAlert} from "./NetworkAlert";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NetworkAlert />
      <AppHeader />
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {children}
      </Box>
    </>
  );
}
