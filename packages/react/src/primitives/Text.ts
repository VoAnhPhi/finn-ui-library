import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import type { Theme } from "@finn-ui/theme";
import { useTheme } from "../theme-context";
import { resolveColor } from "./style";
import type { ResponsiveElement, ThemeColorValue } from "./style";

export type TextVariant = "display" | "heading" | "title" | "body" | "caption" | "label" | "button";

type NativeTextProps = Omit<HTMLAttributes<HTMLElement>, "color">;

export type TextProps = NativeTextProps & {
  as?: ResponsiveElement;
  variant?: TextVariant;
  tone?: "default" | "muted" | "primary" | "danger" | "success" | "warning";
  color?: ThemeColorValue;
  align?: CSSProperties["textAlign"];
  weight?: keyof Theme["tokens"]["typography"]["fontWeight"] | number;
  size?: keyof Theme["tokens"]["typography"]["fontSize"] | number;
  children?: ReactNode;
  style?: CSSProperties;
};

const variantStyles: Record<TextVariant, CSSProperties> = {
  display: { fontSize: 40, lineHeight: 1.15, fontWeight: 700 },
  heading: { fontSize: 32, lineHeight: 1.15, fontWeight: 700 },
  title: { fontSize: 24, lineHeight: 1.3, fontWeight: 600 },
  body: { fontSize: 16, lineHeight: 1.5, fontWeight: 400 },
  caption: { fontSize: 12, lineHeight: 1.5, fontWeight: 400 },
  label: { fontSize: 14, lineHeight: 1.3, fontWeight: 500 },
  button: { fontSize: 14, lineHeight: 1.3, fontWeight: 600 }
};

const defaultElementByVariant: Record<TextVariant, ResponsiveElement> = {
  display: "h1",
  heading: "h2",
  title: "h3",
  body: "p",
  caption: "span",
  label: "span",
  button: "span"
};

const colorByTone = {
  default: "foreground",
  muted: "muted",
  primary: "primary",
  danger: "danger",
  success: "success",
  warning: "warning"
} as const;

type RecipeStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;

function toCssLength(value: number | string | undefined) {
  return typeof value === "number" ? `${value}px` : value;
}

export function Text({
  as,
  variant = "body",
  tone = "default",
  color,
  align,
  weight,
  size,
  style,
  children,
  ...rest
}: TextProps): ReactElement {
  const theme = useTheme();
  const variantStyle = variantStyles[variant];
  const resolvedWeight =
    typeof weight === "string"
      ? `var(--finn-font-weight-${weight}, ${theme.tokens.typography.fontWeight[weight]})`
      : weight;
  const resolvedSize =
    typeof size === "string"
      ? `var(--finn-font-size-${size}, ${theme.tokens.typography.fontSize[size]})`
      : toCssLength(size);
  const resolvedStyle: RecipeStyle = {
    "--finn-text-align": align,
    "--finn-text-color": resolveColor(theme, color ?? colorByTone[tone]),
    "--finn-text-line-height": variantStyle.lineHeight,
    "--finn-text-size": resolvedSize ?? toCssLength(variantStyle.fontSize),
    "--finn-text-weight": resolvedWeight ?? variantStyle.fontWeight,
    ...style
  };

  return createElement(
    as ?? defaultElementByVariant[variant],
    {
      ...rest,
      "data-finn-ui-text": true,
      "data-tone": tone,
      "data-variant": variant,
      style: resolvedStyle
    },
    children
  );
}
