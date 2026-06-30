import { tokens } from "@finn-ui/tokens";
import type { BorderWidthToken, RadiusToken, ShadowToken, Tokens } from "@finn-ui/tokens";

export type ThemeColorName =
  | "background"
  | "foreground"
  | "card"
  | "cardForeground"
  | "border"
  | "primary"
  | "primaryForeground"
  | "neutral"
  | "neutralForeground"
  | "danger"
  | "dangerForeground"
  | "success"
  | "successForeground"
  | "warning"
  | "warningForeground"
  | "muted"
  | "mutedForeground";

export type ThemeColors = Record<ThemeColorName, string>;

export type ComponentTheme = {
  radius?: RadiusToken;
  borderWidth?: BorderWidthToken;
  shadow?: ShadowToken;
};

export type ThemeComponents = {
  Button: ComponentTheme;
  Input: ComponentTheme;
  Card: ComponentTheme;
};

export type Theme = {
  name: string;
  tokens: Tokens;
  colors: ThemeColors;
  components: ThemeComponents;
};

export type ThemeInput = {
  name?: string;
  colors?: Partial<ThemeColors>;
  components?: Partial<{
    [ComponentName in keyof ThemeComponents]: Partial<ThemeComponents[ComponentName]>;
  }>;
};

const defaultComponents: ThemeComponents = {
  Button: {
    radius: "lg",
    borderWidth: "thin",
    shadow: "none"
  },
  Input: {
    radius: "md",
    borderWidth: "thin",
    shadow: "none"
  },
  Card: {
    radius: "lg",
    borderWidth: "thin",
    shadow: "sm"
  }
};

const baseColors: ThemeColors = {
  background: tokens.colors.white,
  foreground: tokens.colors.black,
  card: tokens.colors.gray50,
  cardForeground: tokens.colors.black,
  border: tokens.colors.gray200,
  primary: tokens.colors.blue600,
  primaryForeground: tokens.colors.white,
  neutral: tokens.colors.gray700,
  neutralForeground: tokens.colors.white,
  danger: tokens.colors.red600,
  dangerForeground: tokens.colors.white,
  success: tokens.colors.green600,
  successForeground: tokens.colors.white,
  warning: tokens.colors.amber500,
  warningForeground: tokens.colors.black,
  muted: tokens.colors.gray500,
  mutedForeground: tokens.colors.gray400
};

export function createTheme(input: ThemeInput = {}): Theme {
  return {
    name: input.name ?? "custom",
    tokens,
    colors: {
      ...baseColors,
      ...input.colors
    },
    components: {
      Button: {
        ...defaultComponents.Button,
        ...input.components?.Button
      },
      Input: {
        ...defaultComponents.Input,
        ...input.components?.Input
      },
      Card: {
        ...defaultComponents.Card,
        ...input.components?.Card
      }
    }
  };
}

export const lightTheme = createTheme({
  name: "light"
});

export const darkTheme = createTheme({
  name: "dark",
  colors: {
    background: "#0B1120",
    foreground: "#F9FAFB",
    card: "#111827",
    cardForeground: "#F9FAFB",
    border: "#253044",
    primary: "#60A5FA",
    primaryForeground: "#0B1120",
    neutral: "#E5E7EB",
    neutralForeground: "#111827",
    danger: "#F87171",
    dangerForeground: "#111827",
    success: "#4ADE80",
    successForeground: "#111827",
    warning: "#FBBF24",
    warningForeground: "#111827",
    muted: "#9CA3AF",
    mutedForeground: "#6B7280"
  },
  components: {
    Card: {
      shadow: "none"
    }
  }
});
