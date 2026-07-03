import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";

export const customStorybookTheme = createTheme({
  name: "storybook custom",
  colors: {
    primary: "#7C3AED",
    primaryForeground: "#FFFFFF",
    danger: "#E11D48",
    success: "#059669",
    warning: "#B45309",
    card: "#F5F3FF",
    border: "#DDD6FE",
    muted: "#6D28D9"
  },
  components: {
    Button: {
      radius: "xl"
    },
    Input: {
      radius: "lg"
    },
    Card: {
      radius: "xl",
      shadow: "md"
    }
  }
});

export const storybookThemes = {
  light: lightTheme,
  dark: darkTheme,
  custom: customStorybookTheme
} as const;

export type StorybookThemeName = keyof typeof storybookThemes;
