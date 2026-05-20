import { Box, Container, Skeleton, Stack, Grid } from '@mui/material';

export default function ProceduresLoading() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
          <Skeleton variant="text" width="40%" height={56} />
          <Skeleton variant="text" width="60%" height={24} />
        </Stack>
        {/* Search + filter bar */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <Skeleton variant="rectangular" height={56} sx={{ flexGrow: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={140} height={56} sx={{ borderRadius: 1 }} />
        </Stack>
        {/* Card grid */}
        <Grid container spacing={2}>
          {Array.from({ length: 9 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
