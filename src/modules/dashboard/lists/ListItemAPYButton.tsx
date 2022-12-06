import {
  CheckIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link } from 'src/components/primitives/Link';

interface ListItemAPYButtonProps {
  borrowRateMode: string;
  disabled: boolean;
  onClick: () => void;
  variableBorrowAPY: string;
  underlyingAsset: string;
}

export const ListItemAPYButton = ({
  borrowRateMode,
  disabled,
  onClick,
  variableBorrowAPY,
}: ListItemAPYButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        size="small"
        disabled={disabled}
        data-cy={`apyButton_${borrowRateMode}`}
      >
        {borrowRateMode}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        keepMounted={true}
        data-cy={`apyMenu_${borrowRateMode}`}
      >
        <MenuItem
          selected={true}
          value={'Variable'}
          onClick={onClick}
        >
          <ListItemIcon>
            <SvgIcon><CheckIcon /></SvgIcon>
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: 'description' }}>
            <Trans>APY, variable</Trans>
          </ListItemText>
          <FormattedNumber value={Number(variableBorrowAPY)} percent variant="description" />
        </MenuItem>

        <Divider />
      </Menu>
    </>
  );
};
