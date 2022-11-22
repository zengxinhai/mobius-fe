import { LinkIcon as ExternalLinkIcon } from '@heroicons/react/24/outline';
import { Trans } from '@lingui/macro';
import { Button, SvgIcon, Typography } from '@mui/material';

import { DarkTooltip } from './infoTooltips/DarkTooltip';
import { Link, ROUTES } from './primitives/Link';

export const FaucetButton = () => {

  return (
    <DarkTooltip title="Get free assets to test the Aave Protocol">
      <Button
        endIcon={
          <SvgIcon sx={{ width: 14, height: 14 }}>
            <ExternalLinkIcon />
          </SvgIcon>
        }
        component={Link}
        href={ROUTES.faucet}
        variant="outlined"
        size="small"
      >
        <Typography variant="buttonS">
          <Trans>Faucet</Trans>
        </Typography>
      </Button>
    </DarkTooltip>
  );
};
