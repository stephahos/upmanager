import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d7d3e4",
          200: "#b0a8c8",
          300: "#887cad",
          400: "#615191",
          500: "#392576",
          600: "#2e1e5e",
          700: "#221647",
          800: "#170f2f",
          900: "#0b0718",
        },
        greenAccent: {
          100: "#f2fbe3",
          200: "#e6f7c8",
          300: "#d9f3ac",
          400: "#cdef91",
          500: "#c0eb75",
          600: "#9abc5e",
          700: "#738d46",
          800: "#4d5e2f",
          900: "#262f17",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#dfd8f3",
          200: "#bfb1e7",
          300: "#9f8bdc",
          400: "#7f64d0",
          500: "#5f3dc4",
          600: "#4c319d",
          700: "#392576",
          800: "#26184e",
          900: "#130c27",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#dfd8f3",
          200: "#bfb1e7",
          300: "#9f8bdc",
          400: "#7f64d0",
          500: "#5f3dc4",
          600: "#4c319d",
          700: "#392576",
          800: "#26184e",
          900: "#130c27",
        },
        greenAccent: {
          100: "#f2fbe3",
          200: "#e6f7c8",
          300: "#d9f3ac",
          400: "#cdef91",
          500: "#c0eb75",
          600: "#9abc5e",
          700: "#738d46",
          800: "#4d5e2f",
          900: "#262f17",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[300],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[200],
              main: colors.grey[300],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const themeTwo = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [themeTwo, colorMode];
};
/* yellow: {
    100: "#f2fbe3",
    200: "#e6f7c8",
    300: "#d9f3ac",
    400: "#cdef91",
    500: "#c0eb75",
    600: "#9abc5e",
    700: "#738d46",
    800: "#4d5e2f",
    900: "#262f17"
}, */
