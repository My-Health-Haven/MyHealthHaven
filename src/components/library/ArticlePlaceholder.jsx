'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, alpha, useTheme } from '@mui/material';

const ArticlePlaceholder = ({
  image,
  alt,
  width = 600,
  height = 338,
  sizes = '(max-width: 900px) 100vw, 33vw',
  sx = {},
}) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  if (image) {
    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: `${width} / ${height}`,
          overflow: 'hidden',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          ...sx,
        }}
      >
        <Image src={image} alt={alt} fill sizes={sizes} style={{ objectFit: 'cover' }} />
      </Box>
    );
  }

  return (
    <Box
      role='img'
      aria-label={alt}
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: `${width} / ${height}`,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        background: `linear-gradient(135deg, ${alpha(secondary, 0.22)} 0%, ${alpha('#A78BFA', 0.18)} 45%, ${alpha(primary, 0.14)} 100%)`,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${alpha(secondary, 0.18)} 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
          opacity: 0.6,
        },
        ...sx,
      }}
    />
  );
};

ArticlePlaceholder.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  sizes: PropTypes.string,
  sx: PropTypes.object,
};

export default ArticlePlaceholder;
