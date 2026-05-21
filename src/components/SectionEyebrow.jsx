import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, alpha, useTheme } from '@mui/material';

const SectionEyebrow = ({
  text,
  icon,
  variant = 'pill',
  align = 'center',
  color = 'primary',
  sx = {},
}) => {
  const theme = useTheme();
  const accent = theme.palette[color]?.main || theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  if (variant === 'plain') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'center' ? 'center' : 'flex-start',
          mb: 2,
          ...sx,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: accent,
            fontWeight: 700,
            letterSpacing: 1.4,
            fontSize: '0.78rem',
          }}
        >
          {text}
        </Typography>
        <Box
          sx={{
            mt: 0.5,
            width: 112,
            height: 2,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${accent} 0%, ${secondary} 100%)`,
          }}
          aria-hidden="true"
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 0.75,
        borderRadius: 999,
        bgcolor: alpha(accent, 0.1),
        border: '1px solid',
        borderColor: alpha(accent, 0.18),
        color: accent,
        ...sx,
      }}
    >
      {icon &&
        React.isValidElement(icon) &&
        React.cloneElement(icon, {
          sx: { fontSize: 16, color: accent, ...(icon.props?.sx || {}) },
        })}
      <Typography
        variant="overline"
        sx={{
          color: accent,
          fontWeight: 700,
          letterSpacing: 1.2,
          fontSize: '0.72rem',
          lineHeight: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

SectionEyebrow.propTypes = {
  text: PropTypes.node.isRequired,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['pill', 'plain']),
  align: PropTypes.oneOf(['left', 'center']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  sx: PropTypes.object,
};

export default SectionEyebrow;
