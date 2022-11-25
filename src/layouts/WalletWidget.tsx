import { UserCircleIcon, DocumentDuplicateIcon as DuplicateIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LinkIcon as ExternalLinkIcon,
} from '@heroicons/react/20/solid';
import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Skeleton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState, useContext } from 'react';

import { Link } from 'src/components/primitives/Link';
import { textCenterEllipsis } from 'src/utils/text-center-ellipsis';
import { DrawerWrapper } from './components/DrawerWrapper';
import { MobileCloseButton } from './components/MobileCloseButton';
import { web3Context } from 'src/libs/Web3Provider';

interface WalletWidgetProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
}

const WalletWidget: React.FC<WalletWidgetProps> = ({ open, setOpen, headerHeight }) => {
  const {
    disconnectWallet,
    connectWallet,
    currentAccount,
    connected,
    connecting,
    } = useContext(web3Context);

  const { breakpoints, palette } = useTheme();
  const xsm = useMediaQuery(breakpoints.down('xsm'));
  const md = useMediaQuery(breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  let networkColor = '#65c970';

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!connected) {
      connectWallet();
    } else {
      setOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleDisconnect = async () => {
    if (connected) {
      await disconnectWallet();
      handleClose();
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentAccount);
    handleClose();
  };

  const handleSwitchWallet = (): void => {
    connectWallet();
    handleClose();
  };

  const hideWalletAccountText = xsm;

  const accountAvatar = (
    <Box
      sx={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        border: '1px solid #FAFBFC1F',
        img: { width: '100%', height: '100%', borderRadius: '50%' },
      }}
    >
      <UserCircleIcon />
    </Box>
  );
  
  let buttonContent = <></>;
  if (currentAccount) {
    if (hideWalletAccountText) {
      buttonContent = <Box sx={{margin: '1px 0'}}>{accountAvatar}</Box>;
    } else {
      buttonContent = <>{textCenterEllipsis(currentAccount, 4, 4)}</>;
    }
  } else {
    buttonContent = <Trans>Connect wallet</Trans>;
  }
  
  const Content = ({component = ListItem}: { component?: typeof MenuItem | typeof ListItem }) => (
      <>
        <Typography
          variant="subheader2"
          sx={{
            display: {xs: 'block', md: 'none'},
            color: '#A5A8B6',
            px: 4,
            py: 2,
          }}
        >
          <Trans>Account</Trans>
        </Typography>
      
        <Box component={component} disabled>
          <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid #FAFBFC1F',
                  mr: 3,
                  img: {width: '100%', height: '100%', borderRadius: '50%'},
                }}
              >
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
              
                <Typography
                  variant='h4'
                  color={{xs: '#F1F1F3', md: 'text.primary'}}
                >
                  {textCenterEllipsis(currentAccount || '', 7, 4)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {!md && (
          <Box sx={{display: 'flex', flexDirection: 'row', padding: '0 16px 10px'}}>
            <Button
              variant="outlined"
              sx={{
                padding: '0 5px',
                marginRight: '10px',
              }}
              size="small"
              onClick={handleSwitchWallet}
            >
              Switch wallet
            </Button>
            <Button
              variant="outlined"
              sx={{
                padding: '0 5px',
              }}
              size="small"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </Box>
        )}
        <Divider sx={{my: {xs: 7, md: 0}, borderColor: {xs: '#FFFFFF1F', md: 'divider'}}}/>
      
        <Box component={component} disabled>
          <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography variant="caption" color={{xs: '#FFFFFFB2', md: 'text.secondary'}}>
                <Trans>Network</Trans>
              </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Box
                sx={{
                  bgcolor: networkColor,
                  width: 6,
                  height: 6,
                  mr: 2,
                  boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
                  borderRadius: '50%',
                }}
              />
              <Typography color={{xs: '#F1F1F3', md: 'text.primary'}} variant="subheader1">
                Aptos
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{my: {xs: 7, md: 0}, borderColor: {xs: '#FFFFFF1F', md: 'divider'}}}/>
      
        <Box
          component={component}
          sx={{color: {xs: '#F1F1F3', md: 'text.primary'}}}
          onClick={handleCopy}
        >
          <ListItemIcon
            sx={{
              color: {
                xs: '#F1F1F3',
                md: 'primary.light',
                minWidth: 'unset',
                marginRight: 12,
              },
            }}
          >
            <SvgIcon fontSize="small">
              <DuplicateIcon/>
            </SvgIcon>
          </ListItemIcon>
          <ListItemText>
            <Trans>Copy address</Trans>
          </ListItemText>
        </Box>
      
        <Link href='https://aptos.com/aptos-explorer'>
          <Box
            component={component}
            sx={{color: {xs: '#F1F1F3', md: 'text.primary'}}}
            onClick={handleClose}
          >
            <ListItemIcon
              sx={{
                color: {
                  xs: '#F1F1F3',
                  md: 'primary.light',
                  minWidth: 'unset',
                  marginRight: 12,
                },
              }}
            >
              <SvgIcon fontSize="small">
                <ExternalLinkIcon/>
              </SvgIcon>
            </ListItemIcon>
            <ListItemText>
              <Trans>View on Explorer</Trans>
            </ListItemText>
          </Box>
        </Link>
        {md && (
          <>
            <Divider sx={{my: {xs: 7, md: 0}, borderColor: {xs: '#FFFFFF1F', md: 'divider'}}}/>
            <Box sx={{padding: '16px 16px 10px'}}>
              <Button
                sx={{
                  marginBottom: '16px',
                  background: '#383D51',
                  color: '#F1F1F3',
                }}
                fullWidth
                size="large"
                variant={palette.mode === 'dark' ? 'outlined' : 'text'}
                onClick={handleSwitchWallet}
              >
                Switch wallet
              </Button>
              <Button
                sx={{
                  background: '#383D51',
                  color: '#F1F1F3',
                }}
                fullWidth
                size="large"
                variant={palette.mode === 'dark' ? 'outlined' : 'text'}
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </Box>
          </>
        )}
      </>
    );
  
  return (
    <>
      {md && connected && open ? (
        <MobileCloseButton setOpen={setOpen}/>
      ) : connecting ? (
        <Skeleton height={36} width={126} sx={{background: '#383D51'}}/>
      ) : (
        <Button
          variant={connected ? 'surface' : 'gradient'}
          aria-label="wallet"
          id="wallet-button"
          aria-controls={open ? 'wallet-button' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            p: connected ? '5px 8px' : undefined,
            minWidth: hideWalletAccountText ? 'unset' : undefined,
          }}
          startIcon={connected && !hideWalletAccountText && accountAvatar}
          endIcon={
            connected &&
            !hideWalletAccountText &&
            !md && (
              <SvgIcon
                sx={{
                  display: {xs: 'none', md: 'block'},
                }}
              >
                {open ? <ChevronUpIcon/> : <ChevronDownIcon/>}
              </SvgIcon>
            )
          }
        >
          {buttonContent}
        </Button>
      )}
    
      {md ? (
        <DrawerWrapper open={open} setOpen={setOpen} headerHeight={headerHeight}>
          <List sx={{px: 2, '.MuiListItem-root.Mui-disabled': {opacity: 1}}}>
            <Content/>
          </List>
        </DrawerWrapper>
      ) : (
        <Menu
          id="wallet-menu"
          MenuListProps={{
            'aria-labelledby': 'wallet-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          keepMounted={true}
        >
          <MenuList disablePadding sx={{'.MuiMenuItem-root.Mui-disabled': {opacity: 1}}}>
            <Content component={MenuItem}/>
          </MenuList>
        </Menu>
      )}
    
    </>
  );
}

export default WalletWidget;
