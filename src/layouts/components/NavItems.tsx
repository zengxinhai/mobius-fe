import { useLingui } from '@lingui/react';
import { Button, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
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
                  color: '#F1F1F3',
                  p: '6px 8px',
                  position: 'relative',
                  '.active&:after, &:hover&:after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                  '&:after': {
                    content: "''",
                    position: 'absolute',
                    width: '100%',
                    transform: 'scaleX(0)',
                    height: '2px',
                    bottom: '-6px',
                    left: '0',
                    background: theme.palette.gradients.aaveGradient,
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  },
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
