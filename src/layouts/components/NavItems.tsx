import { useLingui } from '@lingui/react';
import { Button, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Link } from 'src/components/primitives/Link';
import { navigation } from 'src/ui-config/menu-items';

interface NavItemsProps {
  setOpen?: (value: boolean) => void;
}

export const NavItems = ({ setOpen }: NavItemsProps) => {
  const { i18n } = useLingui();

  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));
  
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <List
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' },
      }}
      disablePadding
    >
      {navigation
        .map((item, index) => (
          <ListItem
            sx={{
              width: { xs: '100%', md: 'unset' },
              mr: { xs: 0, md: 2 },
            }}
            data-cy={item.dataCy}
            disablePadding
            disabled={item.disabled}
            key={index}
          >
            {md ? (
              <Typography
                component={Link}
                href={item.link}
                variant="h2"
                color="#F1F1F3"
                sx={{ width: '100%', p: 4 }}
                onClick={() => (setOpen ? setOpen(false) : undefined)}
              >
                {i18n._(item.title)}
              </Typography>
            ) : (
              <Button
                component={Link}
                href={item.link}
                disabled={item.disabled}
                sx={(theme) => ({
                  background: item.link === currentPath ? theme.palette.background.grey : undefined,
                  p: '1px 12px',
                  fontWeight: theme.typography.fontWeightBold
                })}
              >
                {i18n._(item.title)}
              </Button>
            )}
          </ListItem>
        ))}
    </List>
  );
};
