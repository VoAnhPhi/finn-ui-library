export const colors = {
  white: "#FFFFFF",
  black: "#111827",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray700: "#374151",
  blue600: "#2563EB",
  blue700: "#1D4ED8",
  red600: "#DC2626",
  green600: "#16A34A",
  amber500: "#F59E0B"
} as const;

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48
} as const;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999
} as const;

export const borderWidth = {
  none: 0,
  thin: 1,
  medium: 2
} as const;

export const typography = {
  fontFamily: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    mono: "\"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace"
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    "2xl": 32,
    "3xl": 40
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeight: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.7
  }
} as const;

export const shadow = {
  none: "none",
  sm: "0 1px 2px rgb(17 24 39 / 0.08)",
  md: "0 8px 24px rgb(17 24 39 / 0.12)",
  lg: "0 18px 48px rgb(17 24 39 / 0.16)"
} as const;

export const opacity = {
  disabled: 0.5,
  muted: 0.72,
  overlay: 0.4
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modal: 1200,
  toast: 1300
} as const;

export const duration = {
  fast: "120ms",
  normal: "180ms",
  slow: "240ms"
} as const;

export const easing = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  emphasized: "cubic-bezier(0.2, 0, 0, 1.2)"
} as const;

export const tokens = {
  colors,
  spacing,
  radius,
  borderWidth,
  typography,
  shadow,
  opacity,
  zIndex,
  duration,
  easing
} as const;

export type Tokens = typeof tokens;
export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type BorderWidthToken = keyof typeof borderWidth;
export type ShadowToken = keyof typeof shadow;
