import React from "react";
import {useWeb3Context} from "../libs/Web3Provider";
import {Box, Typography, useTheme} from "@mui/material";
import {useRootStore} from "../store/root";

export const NetworkAlert: React.FC = () => {
  const { connected } = useWeb3Context();
  const networkName = useRootStore(state => state.networkName)
  const theme = useTheme();
  const gradient = theme.palette.gradients.mobiusGradient;
  if (!connected || networkName === 'Testnet') return null;
  return (
    <Box style={{ background: gradient, textAlign: 'center', padding: '12px 0' }}>
      <Typography fontSize={20} color={theme.palette.text.contrastPrimary}>
        Please switch to Testnet
      </Typography>
    </Box>
  )
}
