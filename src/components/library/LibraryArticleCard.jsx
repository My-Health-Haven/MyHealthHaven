'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Box, Typography, Button, alpha, useTheme } from '@mui/material';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArticlePlaceholder from './ArticlePlaceholder';
import { getLibraryArticlePath } from '../../data/libraryContent';

const LibraryArticleCard = ({ article, guideLabel, readArticleLabel }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: alpha(primary, 0.08),
        boxShadow: '0 4px 16px rgba(17, 24, 39, 0.04)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 16px 40px ${alpha(primary, 0.14)}`,
          borderColor: alpha(primary, 0.2),
        },
      }}
    >
      <ArticlePlaceholder image={article.image} alt={article.imageAlt} />

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
            gap: 0.75,
            bgcolor: alpha(primary, 0.1),
            border: '1px solid',
            borderColor: alpha(primary, 0.18),
            borderRadius: 999,
            px: 1.5,
            py: 0.5,
            mb: 2,
          }}
        >
          <AutoStoriesRoundedIcon sx={{ fontSize: 14, color: primary }} />
          <Typography
            variant='overline'
            sx={{
              color: primary,
              fontWeight: 700,
              letterSpacing: 1.2,
              fontSize: '0.7rem',
              lineHeight: 1,
            }}
          >
            {article.type || guideLabel}
          </Typography>
        </Box>

        <Typography
          variant='h6'
          sx={{
            fontWeight: 700,
            color: primaryDark,
            mb: 0.75,
            lineHeight: 1.35,
          }}
        >
          {article.title}
        </Typography>

        {(article.category || article.readTime) && (
          <Typography
            variant='caption'
            sx={{ color: 'text.secondary', display: 'block', mb: 1.25 }}
          >
            {[article.category, article.readTime].filter(Boolean).join('  ·  ')}
          </Typography>
        )}

        <Typography
          variant='body2'
          sx={{ color: 'text.secondary', lineHeight: 1.65, mb: 2.5, flexGrow: 1 }}
        >
          {article.excerpt || article.summary}
        </Typography>

        <Button
          component={Link}
          href={getLibraryArticlePath(article)}
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            color: primary,
            fontWeight: 600,
            px: 0,
            alignSelf: 'flex-start',
            '&:hover': {
              bgcolor: 'transparent',
              color: primaryDark,
            },
          }}
        >
          {readArticleLabel}
        </Button>
      </Box>
    </Box>
  );
};

LibraryArticleCard.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    category: PropTypes.string,
    categorySlug: PropTypes.string,
    type: PropTypes.string,
    readTime: PropTypes.string,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
  }).isRequired,
  guideLabel: PropTypes.string.isRequired,
  readArticleLabel: PropTypes.string.isRequired,
};

export default LibraryArticleCard;
