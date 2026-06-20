import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
  Fade,
  Link as MuiLink,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Link from 'next/link';

import { useLanguage } from '../context/LanguageContext';

const WhatsAppWidget = () => {
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(false);
  const [coords, setCoords] = useState({ top: 20, left: 20 });

  const [isDragging, setIsDragging] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  // Constants
  const BUBBLE_SIZE = 60;
  const MARGIN = 20;
  const NAVBAR_HEIGHT = 100; // utility bar (~32px) + AppBar (~64px) with safety margin

  // Keep coords in ref for resize handler to avoid re-attaching listener
  const coordsRef = useRef(coords);
  useEffect(() => {
    coordsRef.current = coords;
  }, [coords]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setCoords({
      top: window.innerHeight - 80,
      left: window.innerWidth - 80,
    });
    setIsReady(true);
  }, []);

  const clampToBounds = useCallback(
    (currentLeft, currentTop) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const minLeft = MARGIN;
      const maxLeft = windowWidth - BUBBLE_SIZE - MARGIN;
      const minTop = NAVBAR_HEIGHT;
      const maxTop = windowHeight - BUBBLE_SIZE - MARGIN;
      return {
        left: Math.max(minLeft, Math.min(maxLeft, currentLeft)),
        top: Math.max(minTop, Math.min(maxTop, currentTop)),
      };
    },
    [BUBBLE_SIZE, MARGIN, NAVBAR_HEIGHT]
  );

  useEffect(() => {
    if (!isReady) return undefined;

    const handleResize = () => {
      setCoords(clampToBounds(coordsRef.current.left, coordsRef.current.top));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, clampToBounds]);

  const handlePointerDown = (e) => {
    // Only left click or touch
    if (e.button !== 0 && e.type === 'pointerdown') return;

    setIsDragging(true);
    hasMoved.current = false;
    dragStartPos.current = {
      x: e.clientX - coords.left,
      y: e.clientY - coords.top,
    };

    // Capture pointer
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const newLeft = e.clientX - dragStartPos.current.x;
    const newTop = e.clientY - dragStartPos.current.y;

    // Simple distance check to distinguish click vs drag
    if (Math.abs(e.movementX) > 0 || Math.abs(e.movementY) > 0) {
      hasMoved.current = true;
    }

    setCoords(clampToBounds(newLeft, newTop));
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (!hasMoved.current) {
      setIsChatOpen(!isChatOpen);
    }
    // No snap — bubble stays at the (already-clamped) drop position
  };

  const handleSendMessage = () => {
    // Replace with your number
    const phoneNumber = '12142763928';
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      {/* Chat Window */}
      <Fade in={isChatOpen}>
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: isDragging ? -1000 : '100px', // Hide when dragging (optional) or keep static relative to screen
            // Actually let's make it appear near functionality or just centered/bottom-right default?
            // Let's stick it fixed to bottom right for simplicity or near the bubble?
            // "If you hold you can drag around... [bubble]"
            // Chat window usually sits fixed or pops relative to bubble.
            // Given the bubble moves, a fixed position for chat window (e.g. bottom right) might overlap if bubble is there.
            // Let's position it automatically based on quadrant?
            // For simplicity, let's put it Bottom-Right fixed, but if bubble is there, maybe move it?
            // Let's just Center it or Fixed Bottom Right always.
            right: 20,

            zIndex: 9998,
            width: 300,
            p: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
            <Typography variant='subtitle1' fontWeight='bold'>
              {t('whatsapp.title')}
            </Typography>
            <IconButton size='small' onClick={() => setIsChatOpen(false)}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant='outlined'
            placeholder={t('whatsapp.placeholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            size='small'
          />
          <Button
            variant='contained'
            color='success'
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            sx={{ mt: 1 }}
          >
            {t('whatsapp.start')}
          </Button>
          <Box
            sx={{
              mt: 1,
              pt: 1.5,
              borderTop: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
            }}
          >
            <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 0.5 }}>
              {t('whatsapp.alternativeIntro')}
            </Typography>
            <MuiLink
              component={Link}
              href='/schedule'
              variant='body2'
              underline='hover'
              onClick={() => setIsChatOpen(false)}
            >
              {t('whatsapp.scheduleCall')}
            </MuiLink>
          </Box>
        </Paper>
      </Fade>

      {/* Draggable Bubble */}
      <Box
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        title={t('whatsapp.tooltip')}
        sx={{
          position: 'fixed',
          left: coords.left,
          top: coords.top,
          width: BUBBLE_SIZE,
          height: BUBBLE_SIZE,
          zIndex: 9999,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none', // Critical for pointer events dragging
          transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', // Smooth snap, instant drag
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
      >
        <img
          src='/WhatsApp.png'
          alt='WhatsApp'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      </Box>
    </>
  );
};

export default WhatsAppWidget;
