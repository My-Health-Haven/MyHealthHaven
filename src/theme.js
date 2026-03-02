import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const createStaggeredAnimationDelays = (maxItems = 12, stepMs = 35) => {
  const delays = {};
  for (let i = 1; i <= maxItems; i += 1) {
    delays[`&:nth-of-type(${i})`] = {
      animationDelay: `${(i - 1) * stepMs}ms`,
    };
  }
  return delays;
};

const listItemMotionStyles = {
  animation: "listItemPopIn 0.2s ease both",
  transformOrigin: "left center",
  transition: "transform 0.2s ease, background-color 0.2s ease, opacity 0.2s ease",
  ...createStaggeredAnimationDelays(),
};

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#00897B", // Teal from logo
      dark: "#00695C",
    },
    secondary: {
      main: "#8E24AA", // Purple from logo
    },
    text: {
      primary: "#1F2933",
      secondary: "#6B7280",
    },
    background: {
      default: "#F4FAFF",
      paper: "#FFFFFF",
    },
    error: {
      main: "#DC2626",
    },
  },
  typography: {
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      fontSize: "clamp(2.4rem, 3vw, 3.2rem)",
      fontWeight: 700,
    },
    h2: {
      fontSize: "clamp(1.9rem, 2.4vw, 2.4rem)",
      fontWeight: 600,
    },
    h3: {
      fontSize: "clamp(1.5rem, 2vw, 1.8rem)",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "1rem", // Keeping body2 readable, maybe slightly smaller or same as body1 but different usage
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@keyframes listItemPopIn": {
          "0%": {
            opacity: 0,
            transform: "scale(0.7)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        "main ul li, main ol li": {
          ...listItemMotionStyles,
        },
        ".MuiList-root .MuiListItem-root": {
          ...listItemMotionStyles,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ...listItemMotionStyles,
          "&:hover": {
            transform: "scale(1.01)",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...listItemMotionStyles,
          "&:hover": {
            transform: "scale(1.01)",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          ...listItemMotionStyles,
          "&[aria-selected='true']": {
            backgroundColor: "rgba(0, 137, 123, 0.12)",
          },
          "&:hover": {
            transform: "scale(1.01)",
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
});

export default responsiveFontSizes(theme);
