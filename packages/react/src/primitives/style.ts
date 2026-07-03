import type { CSSProperties } from "react";
import type { Theme, ThemeColorName } from "@finn-ui/theme";
import type {
  BorderWidthToken,
  RadiusToken,
  ShadowToken,
  SpacingToken
} from "@finn-ui/tokens";

export type ResponsiveElement = keyof HTMLElementTagNameMap;
export type ThemeColorValue = ThemeColorName | string;

export type SpacingStyleProps = {
  p?: SpacingToken | number;
  px?: SpacingToken | number;
  py?: SpacingToken | number;
  m?: SpacingToken | number;
  mx?: SpacingToken | number;
  my?: SpacingToken | number;
};

export type SurfaceStyleProps = {
  bg?: ThemeColorValue;
  color?: ThemeColorValue;
  radius?: RadiusToken | number;
  borderWidth?: BorderWidthToken | number;
  borderColor?: ThemeColorValue;
  shadow?: ShadowToken;
};

function toCssName(value: string) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function toCssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

function cssVariable(prefix: string, name: string, fallback: number | string) {
  return `var(--finn-${prefix}-${toCssName(name)}, ${toCssLength(fallback)})`;
}

export function resolveSpacing(theme: Theme, value: SpacingToken | number | undefined) {
  if (value == null) {
    return undefined;
  }

  return typeof value === "number"
    ? value
    : cssVariable("spacing", value, theme.tokens.spacing[value]);
}

export function resolveColor(theme: Theme, value: ThemeColorValue | undefined) {
  if (value == null) {
    return undefined;
  }

  return value in theme.colors
    ? cssVariable("color", value, theme.colors[value as ThemeColorName])
    : value;
}

export function resolveRadius(theme: Theme, value: RadiusToken | number | undefined) {
  if (value == null) {
    return undefined;
  }

  return typeof value === "number"
    ? value
    : cssVariable("radius", value, theme.tokens.radius[value]);
}

export function resolveBorderWidth(theme: Theme, value: BorderWidthToken | number | undefined) {
  if (value == null) {
    return undefined;
  }

  return typeof value === "number"
    ? value
    : cssVariable("border-width", value, theme.tokens.borderWidth[value]);
}

export function createSpacingStyle(theme: Theme, props: SpacingStyleProps): CSSProperties {
  const style: CSSProperties = {};
  const paddingX = resolveSpacing(theme, props.px);
  const paddingY = resolveSpacing(theme, props.py);
  const marginX = resolveSpacing(theme, props.mx);
  const marginY = resolveSpacing(theme, props.my);

  style.padding = resolveSpacing(theme, props.p);
  style.paddingLeft = paddingX;
  style.paddingRight = paddingX;
  style.paddingTop = paddingY;
  style.paddingBottom = paddingY;
  style.margin = resolveSpacing(theme, props.m);
  style.marginLeft = marginX;
  style.marginRight = marginX;
  style.marginTop = marginY;
  style.marginBottom = marginY;

  return style;
}

export function createSurfaceStyle(theme: Theme, props: SurfaceStyleProps): CSSProperties {
  const borderWidth = resolveBorderWidth(theme, props.borderWidth);
  const borderColor = resolveColor(theme, props.borderColor);

  return {
    background: resolveColor(theme, props.bg),
    color: resolveColor(theme, props.color),
    borderRadius: resolveRadius(theme, props.radius),
    borderWidth,
    borderStyle: borderWidth == null || borderWidth === 0 ? undefined : "solid",
    borderColor:
      borderWidth == null || borderWidth === 0 || borderColor == null
        ? borderColor
        : `color-mix(in srgb, ${borderColor} 68%, transparent)`,
    boxShadow: props.shadow == null ? undefined : theme.tokens.shadow[props.shadow]
  };
}
