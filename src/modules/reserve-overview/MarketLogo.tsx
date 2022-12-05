import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";

type MarketLogoProps = {
  size: number;
  logo: string;
  testChainName?: string;
};

export const MarketLogo = ({ size, logo, testChainName }: MarketLogoProps) => {
  return (
    <Box sx={{ mr: 2, width: size, height: size, position: 'relative' }}>
      <Image src={logo} alt="Market logo" width={20} height={20} />

      {testChainName && (
        <Tooltip title={testChainName} arrow>
          <Box
            sx={{
              bgcolor: '#29B6F6',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              color: 'common.white',
              fontSize: '12px',
              lineHeight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: '-2px',
              bottom: '-2px',
            }}
          >
            {testChainName.split('')[0]}
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

