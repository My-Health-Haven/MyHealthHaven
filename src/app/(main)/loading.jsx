import { Box, Container, Skeleton, Stack } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth='lg'>
        <Stack spacing={3}>
          <Skeleton variant='text' width='50%' height={56} />
          <Skeleton variant='text' width='80%' height={28} />
          <Skeleton variant='rectangular' height={320} sx={{ borderRadius: 2 }} />
          <Stack direction='row' spacing={2}>
            <Skeleton variant='rectangular' width='33%' height={180} sx={{ borderRadius: 2 }} />
            <Skeleton variant='rectangular' width='33%' height={180} sx={{ borderRadius: 2 }} />
            <Skeleton variant='rectangular' width='33%' height={180} sx={{ borderRadius: 2 }} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
