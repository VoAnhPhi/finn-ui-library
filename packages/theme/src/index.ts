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

export type ThemeCssVariables = Record<string, string>;

function toCssName(value: string) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function toCssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

function setVariables(
  variables: ThemeCssVariables,
  prefix: string,
  values: Record<string, number | string>,
  formatValue: (value: number | string) => string = toCssLength
) {
  for (const [name, value] of Object.entries(values)) {
    variables[`--finn-${prefix}-${toCssName(name)}`] = formatValue(value);
  }
}

function toCssValue(value: number | string) {
  return String(value);
}

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
  card: tokens.colors.white,
  cardForeground: tokens.colors.black,
  border: "#E8ECF2",
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

export function createThemeCssVariables(theme: Theme): ThemeCssVariables {
  const variables: ThemeCssVariables = {
    "--finn-theme-name": theme.name
  };

  setVariables(variables, "color", theme.colors);
  setVariables(variables, "token-color", theme.tokens.colors);
  setVariables(variables, "spacing", theme.tokens.spacing);
  setVariables(variables, "radius", theme.tokens.radius);
  setVariables(variables, "border-width", theme.tokens.borderWidth);
  setVariables(variables, "shadow", theme.tokens.shadow);
  setVariables(variables, "opacity", theme.tokens.opacity, toCssValue);
  setVariables(variables, "z-index", theme.tokens.zIndex, toCssValue);
  setVariables(variables, "duration", theme.tokens.duration);
  setVariables(variables, "easing", theme.tokens.easing);
  setVariables(variables, "font-family", theme.tokens.typography.fontFamily);
  setVariables(variables, "font-size", theme.tokens.typography.fontSize);
  setVariables(variables, "font-weight", theme.tokens.typography.fontWeight, toCssValue);
  setVariables(variables, "line-height", theme.tokens.typography.lineHeight, toCssValue);

  for (const [componentName, component] of Object.entries(theme.components)) {
    const prefix = `component-${toCssName(componentName)}`;

    if (component.radius != null) {
      variables[`--finn-${prefix}-radius`] = `var(--finn-radius-${component.radius}, ${toCssLength(theme.tokens.radius[component.radius])})`;
    }

    if (component.borderWidth != null) {
      variables[`--finn-${prefix}-border-width`] =
        `var(--finn-border-width-${component.borderWidth}, ${toCssLength(theme.tokens.borderWidth[component.borderWidth])})`;
    }

    if (component.shadow != null) {
      variables[`--finn-${prefix}-shadow`] =
        `var(--finn-shadow-${component.shadow}, ${theme.tokens.shadow[component.shadow]})`;
    }
  }

  return variables;
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
    border: "#334155",
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
