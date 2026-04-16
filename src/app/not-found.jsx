'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography variant="h2" color="primary" gutterBottom fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Page not found
      </Typography>
      <Button variant="contained" color="primary" component={Link} href="/">
        Go Home
      </Button>
    </Box>
  );
}
