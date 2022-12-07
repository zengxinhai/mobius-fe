import { Trans } from '@lingui/macro';
import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { ContentContainer } from 'src/components/ContentContainer';
import { TopInfoPanel } from 'src/components/TopInfoPanel/TopInfoPanel';
import Image from "next/image";

export default function Mobius404Page() {
  const theme = useTheme();

  return (
    <>
      <TopInfoPanel />
      <ContentContainer>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4,
            flex: 1,
            backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : '',
          }}
        >
          <Box sx={{ maxWidth: 444, m: '0 auto' }}>
            <Image alt='logo' src='/logo.png' width={120} height={26} style={{ marginBottom: '16px' }} />
          </Box>
          <Typography variant="display1" sx={{ mt: 2 }}>
            <Trans>Page not found</Trans>
          </Typography>
          <Typography sx={{ mt: 3, mb: 5, maxWidth: 480 }}>
            <Trans>Sorry, we couldn&apos;t find the page you were looking for.</Trans>
            <br />
            <Trans>We suggest you go back to the Dashboard.</Trans>
          </Typography>
          <Link href="/" passHref>
            <Button variant="outlined" color="primary">
              <Trans>Back to Dashboard</Trans>
            </Button>
          </Link>
        </Paper>
      </ContentContainer>
    </>
  );
}
