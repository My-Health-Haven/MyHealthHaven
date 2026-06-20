import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, alpha, useTheme } from '@mui/material';

const IconFeatureCard = ({
  icon,
  title,
  description,
  variant = 'default',
  color = 'primary',
  titleColor,
  hover = true,
  align = 'left',
  disableBubble = false,
  sx = {},
}) => {
  const theme = useTheme();
  const accent = theme.palette[color]?.main || theme.palette.primary.main;
  const isCompact = variant === 'compact';
  const circleSize = isCompact ? 48 : 56;
  const iconFontSize = isCompact ? 24 : 28;
  const padding = isCompact ? 2.5 : 3;

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        p: padding,
        borderRadius: 3,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: alpha(accent, 0.08),
        boxShadow: '0 4px 16px rgba(17, 24, 39, 0.04)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        textAlign: align,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 12px 32px ${alpha(accent, 0.18)}`,
            borderColor: alpha(accent, 0.2),
          },
        }),
        ...sx,
      }}
    >
      {disableBubble ? (
        <Box sx={{ mb: 2, flexShrink: 0 }} aria-hidden='true'>
          {React.isValidElement(icon)
            ? React.cloneElement(icon, {
                sx: { fontSize: 40, color: accent, ...(icon.props?.sx || {}) },
              })
            : icon}
        </Box>
      ) : (
        <Box
          sx={{
            width: circleSize,
            height: circleSize,
            borderRadius: '50%',
            background: `radial-gradient(circle at 45% 30%, ${alpha('#FFFFFF', 0.88)} 0%, ${alpha(accent, 0.16)} 58%, ${alpha(accent, 0.26)} 100%)`,
            border: `1.5px solid ${alpha(accent, 0.38)}`,
            boxShadow: `inset 0 2px 5px ${alpha(accent, 0.14)}, inset 0 -2px 5px rgba(255,255,255,0.65), 0 4px 14px ${alpha(accent, 0.13)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            flexShrink: 0,
          }}
          aria-hidden='true'
        >
          {React.isValidElement(icon)
            ? React.cloneElement(icon, {
                sx: { fontSize: iconFontSize, color: accent, ...(icon.props?.sx || {}) },
              })
            : icon}
        </Box>
      )}
      <Typography
        variant={isCompact ? 'subtitle1' : 'h6'}
        style={!isCompact ? { fontSize: '1.07rem', lineHeight: 1.3 } : undefined}
        sx={{
          fontWeight: 700,
          mb: description ? 1 : 0,
          color: titleColor || accent,
          lineHeight: 1.3,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ lineHeight: 1.55, fontSize: '0.83rem' }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

IconFeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'compact']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  titleColor: PropTypes.string,
  hover: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center']),
  disableBubble: PropTypes.bool,
  sx: PropTypes.object,
};

export default IconFeatureCard;
