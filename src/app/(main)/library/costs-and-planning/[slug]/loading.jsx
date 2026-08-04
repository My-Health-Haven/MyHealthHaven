import { Box, Container, Skeleton, Stack, Divider } from '@mui/material';

export default function ArticleLoading() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper', minHeight: '80vh' }}>
      <Container maxWidth='md'>
        <Stack spacing={2} sx={{ mb: 4 }}>
          {/* Breadcrumbs */}
          <Skeleton variant='text' width={260} height={20} />
          {/* Title */}
          <Skeleton variant='text' width='75%' height={56} />
          {/* Summary */}
          <Skeleton variant='text' width='90%' height={24} />
          <Skeleton variant='text' width='60%' height={24} />
        </Stack>
        <Divider sx={{ mb: 6 }} />
        <Stack spacing={2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant='text' width={`${85 + (i % 3) * 5}%`} height={20} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
