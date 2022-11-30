import React from 'react';
import {Paper, Typography} from "@mui/material";
import Image from "next/image";
import {Trans} from "@lingui/macro";

export default function PagePlaceholder() {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
        flex: 1,
      }}
    >
      <Image alt='logo' src='/working.png' width={220} height={300} style={{ marginBottom: '16px' }} />
      <>
        <Typography variant="h2" sx={{ mb: 2 }}>
          <Trans>We are working on it.</Trans>
        </Typography>
        <Typography sx={{ mb: 6 }} color="text.secondary">
          <Trans>
            Always on the way to bring web3 to the world!
          </Trans>
        </Typography>
      </>
    </Paper>
  )
}
