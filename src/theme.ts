import type {} from "@mui/x-data-grid/themeAugmentation";
import {alpha, createTheme} from "@mui/material/styles";

export const materialTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#22d3ee",
      light: "#67e8f9",
      dark: "#0891b2",
      contrastText: "#041014",
    },
    secondary: {
      main: "#164e63",
      light: "#0e7490",
      dark: "#082f49",
    },
    background: {
      default: "#020617",
      paper: "#0b1120",
    },
    text: {
      primary: "#ecfeff",
      secondary: "#a5f3fc",
    },
    divider: alpha("#67e8f9", 0.18),
  },
  shape: {
    borderRadius: 22,
  },
  typography: {
    fontFamily: '"Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.04em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at top, rgba(34, 211, 238, 0.14), transparent 35%), #020617",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          boxShadow: "none",
        },
        contained: {
          backgroundImage: "linear-gradient(135deg, #22d3ee, #0ea5e9)",
          color: "#041014",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(180deg, rgba(12, 20, 35, 0.98), rgba(3, 7, 18, 0.92))",
          border: "1px solid rgba(103, 232, 249, 0.14)",
          boxShadow: "0 24px 80px rgba(2, 8, 23, 0.55)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage:
            "linear-gradient(180deg, rgba(12, 20, 35, 0.98), rgba(3, 7, 18, 0.95))",
          border: "1px solid rgba(103, 232, 249, 0.16)",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(103, 232, 249, 0.12)",
          backgroundColor: "rgba(2, 8, 23, 0.6)",
        },
        columnHeaders: {
          backgroundColor: "rgba(8, 145, 178, 0.12)",
        },
        footerContainer: {
          backgroundColor: "rgba(8, 145, 178, 0.08)",
        },
      },
    },
  },
});
