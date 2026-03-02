import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const createStaggeredAnimationDelays = (maxItems = 14, stepMs = 25) => {
  const delays = {};
  for (let i = 1; i <= maxItems; i += 1) {
    delays[`&:nth-of-type(${i})`] = {
      animationDelay: `${(i - 1) * stepMs}ms`,
    };
  }
  return delays;
};

const listItemMotionStyles = {
  animation: "listItemPopIn 0.22s ease forwards",
  transformOrigin: "left center",
  opacity: 0,
  transform: "scale(0.94) translateY(4px)",
  borderRadius: 12,
  marginBottom: 4,
  minHeight: 42,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 8,
  paddingBottom: 8,
  transition: "transform 0.2s ease, background-color 0.2s ease, opacity 0.2s ease",
  "&:last-of-type": {
    marginBottom: 0,
  },
  ...createStaggeredAnimationDelays(),
};

const listHoverStyles = {
  backgroundColor: "#00897B",
  color: "#FFFFFF",
  "& .MuiTypography-root": {
    color: "#FFFFFF",
  },
  "& .MuiListItemText-primary, & .MuiListItemText-secondary": {
    color: "#FFFFFF",
  },
  "& a": {
    color: "#FFFFFF",
  },
  "& svg": {
    color: "#FFFFFF",
  },
};

const listSurfaceStyles = {
  borderRadius: 12,
  border: "1px solid",
  borderColor: "divider",
  boxShadow: "0 16px 32px rgba(17, 24, 39, 0.14)",
  backgroundColor: "background.paper",
  overflow: "hidden",
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
            transform: "scale(0.94) translateY(4px)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        "main ul li:hover, main ol li:hover": {
          ...listHoverStyles,
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
            ...listHoverStyles,
          },
          "&.Mui-selected": {
            backgroundColor: "#00695C",
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          ...listSurfaceStyles,
        },
        list: {
          padding: 6,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...listItemMotionStyles,
          "&.Mui-selected": {
            backgroundColor: "#00695C",
            color: "#FFFFFF",
            fontWeight: 600,
          },
          "&:hover": {
            transform: "scale(1.01)",
            ...listHoverStyles,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          ...listSurfaceStyles,
        },
        listbox: {
          padding: 6,
          maxHeight: 320,
        },
        option: {
          ...listItemMotionStyles,
          "&.Mui-focused": {
            ...listHoverStyles,
          },
          "&[aria-selected='true']": {
            backgroundColor: "#00695C",
            color: "#FFFFFF",
            fontWeight: 600,
          },
          "&:hover": {
            transform: "scale(1.01)",
            ...listHoverStyles,
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
