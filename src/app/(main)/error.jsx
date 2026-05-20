'use client';
import { useEffect } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Route error:', error);
  }, [error]);

  return (
    <Box sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
      <Container maxWidth="sm">
        <Stack spacing={3} alignItems="center">
          <Typography variant="h3" component="h1">
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We couldn&apos;t load this page. Please try again or return home.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => reset()}>
              Try again
            </Button>
            <Button variant="outlined" component={Link} href="/">
              Go home
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
