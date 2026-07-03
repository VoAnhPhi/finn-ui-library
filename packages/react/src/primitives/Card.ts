import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import type { RadiusToken, SpacingToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { createSpacingStyle, resolveBorderWidth, resolveColor, resolveRadius } from "./style";
import type { ResponsiveElement, ThemeColorValue } from "./style";

export type CardVariant = "solid" | "outline" | "elevated" | "ghost";

type NativeCardProps = Omit<HTMLAttributes<HTMLElement>, "color">;

export type CardProps = NativeCardProps & {
  as?: ResponsiveElement;
  variant?: CardVariant;
  p?: SpacingToken | number;
  radius?: RadiusToken | number;
  bg?: ThemeColorValue;
  borderWidth?: "none" | "thin" | "medium" | number;
  borderColor?: ThemeColorValue;
  shadow?: "none" | "sm" | "md" | "lg";
  children?: ReactNode;
  style?: CSSProperties;
};

export function Card({
  as = "section",
  variant = "outline",
  p = "lg",
  radius,
  bg,
  borderWidth,
  borderColor,
  shadow,
  style,
  children,
  ...rest
}: CardProps): ReactElement {
  const theme = useTheme();
  const component = theme.components.Card;
  const defaultBorderWidth = variant === "outline" ? component.borderWidth ?? "thin" : "none";
  const borderWidthValue = borderWidth ?? defaultBorderWidth;
  const resolvedBorderWidth =
    typeof borderWidth === "number"
      ? borderWidth
      : resolveBorderWidth(theme, borderWidthValue);
  const isBorderless = variant === "ghost" || borderWidthValue === "none" || resolvedBorderWidth === 0;
  const resolvedBorderColor = resolveColor(theme, borderColor ?? "border");
  const resolvedStyle: CSSProperties = {
    boxSizing: "border-box",
    background: variant === "ghost" ? "transparent" : resolveColor(theme, bg ?? "card"),
    color: resolveColor(theme, "cardForeground"),
    borderRadius: resolveRadius(theme, radius ?? component.radius ?? "lg"),
    borderStyle: isBorderless ? undefined : "solid",
    borderWidth: isBorderless ? 0 : resolvedBorderWidth,
    borderColor: isBorderless
      ? "transparent"
      : `color-mix(in srgb, ${resolvedBorderColor} 68%, transparent)`,
    boxShadow:
      variant === "elevated"
        ? theme.tokens.shadow[shadow ?? component.shadow ?? "md"]
        : theme.tokens.shadow[shadow ?? (variant === "solid" ? component.shadow ?? "sm" : "none")],
    ...createSpacingStyle(theme, { p }),
    ...style
  };

  return createElement(as, { ...rest, style: resolvedStyle }, children);
}
