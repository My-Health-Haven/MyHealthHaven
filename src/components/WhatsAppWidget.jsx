import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // Fallback or extra icon

const WhatsAppWidget = () => {

  // Actually, let's store Top/Left coordinates for 'fixed' position
  // Setup default to bottom-right corner.
  const [coords, setCoords] = useState(() => ({
    top: window.innerHeight - 80,
    left: window.innerWidth - 80,
  }));

  const [isDragging, setIsDragging] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);


  // Constants
  const BUBBLE_SIZE = 60;
  const MARGIN = 20;

  // Keep coords in ref for resize handler to avoid re-attaching listener
  const coordsRef = useRef(coords);
  useEffect(() => {
    coordsRef.current = coords;
  }, [coords]);

  const snapToNearestCorner = useCallback((currentLeft, currentTop) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const corners = [
      { left: MARGIN, top: MARGIN }, // Top-Left
      { left: windowWidth - BUBBLE_SIZE - MARGIN, top: MARGIN }, // Top-Right
      { left: MARGIN, top: windowHeight - BUBBLE_SIZE - MARGIN }, // Bottom-Left
      {
        left: windowWidth - BUBBLE_SIZE - MARGIN,
        top: windowHeight - BUBBLE_SIZE - MARGIN,
      }, // Bottom-Right
    ];

    // Find closest corner
    let closest = corners[0];
    let minDist = Infinity;

    corners.forEach((corner) => {
      const dist = Math.hypot(
        corner.left - currentLeft,
        corner.top - currentTop
      );
      if (dist < minDist) {
        minDist = dist;
        closest = corner;
      }
    });

    setCoords(closest);
  }, [BUBBLE_SIZE, MARGIN]);

  useEffect(() => {
    // Initial snap to bottom-right on mount/resize logic could be added here
    const handleResize = () => {
      // Use ref to access latest coords without re-running effect
      snapToNearestCorner(coordsRef.current.left, coordsRef.current.top);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [snapToNearestCorner]);

  const handlePointerDown = (e) => {
    // Only left click or touch
    if (e.button !== 0 && e.type === "pointerdown") return;

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

    setCoords({ left: newLeft, top: newTop });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (!hasMoved.current) {
      setIsChatOpen(!isChatOpen);
    } else {
      snapToNearestCorner(coords.left, coords.top);
    }
  };

  const handleSendMessage = () => {
    // Replace with your number
    const phoneNumber = "12142763928";
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Chat Window */}
      <Fade in={isChatOpen}>
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: isDragging ? -1000 : "100px", // Hide when dragging (optional) or keep static relative to screen
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
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              WhatsApp Chat
            </Typography>
            <IconButton size="small" onClick={() => setIsChatOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Hello! I have a question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            size="small"
          />
          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            sx={{ mt: 1 }}
          >
            Start Chat
          </Button>
        </Paper>
      </Fade>

      {/* Draggable Bubble */}
      <Box
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        sx={{
          position: "fixed",
          left: coords.left,
          top: coords.top,
          width: BUBBLE_SIZE,
          height: BUBBLE_SIZE,
          zIndex: 9999,
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none", // Critical for pointer events dragging
          transition: isDragging
            ? "none"
            : "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", // Smooth snap, instant drag
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <img
          src="/WhatsApp.png"
          alt="WhatsApp"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
      </Box>
    </>
  );
};

export default WhatsAppWidget;
