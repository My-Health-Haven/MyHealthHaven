import React from 'react';
import Link from 'next/link';
import { Box, Typography, Chip, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ProcedureRow = ({ procedure }) => {
  const { procedure_id, procedure_name, tags } = procedure;
  const tagList = Array.isArray(tags) ? tags : [];

  return (
    <Box
      component={Link}
      href={`/procedures/${procedure_id}`}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr auto', md: '1fr 1.6fr auto' },
        alignItems: 'center',
        columnGap: 2,
        rowGap: 1,
        px: { xs: 2, md: 3 },
        py: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background-color 0.15s ease',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Typography
        variant="body1"
        fontWeight={600}
        color="text.primary"
        sx={{ gridColumn: { xs: '1', md: '1' } }}
      >
        {procedure_name}
      </Typography>

      {tagList.length > 0 && (
        <Stack
          direction="row"
          spacing={0.75}
          useFlexGap
          flexWrap="wrap"
          sx={{
            gridColumn: { xs: '1 / -1', md: '2' },
            order: { xs: 2, md: 0 },
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
          }}
        >
          {tagList.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.75rem',
                fontWeight: 500,
                bgcolor: 'grey.100',
                color: 'text.secondary',
                borderRadius: 1.5,
              }}
            />
          ))}
        </Stack>
      )}

      <Box
        sx={{
          gridColumn: { xs: '2', md: '3' },
          gridRow: { xs: '1', md: 'auto' },
          color: 'text.disabled',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <ChevronRightIcon fontSize="small" />
      </Box>
    </Box>
  );
};

export default ProcedureRow;
