import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import type { RadiusToken, SpacingToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { resolveBorderWidth, resolveColor, resolveRadius, resolveSpacing } from "./style";
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

type RecipeStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;

export function Card({
  as = "section",
  variant = "outline",
  p = "lg",
  radius,
  bg,
  borderWidth,
  borderColor,
  shadow,
  className,
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
  const resolvedStyle: RecipeStyle = {
    "--finn-card-bg": variant === "ghost" ? "transparent" : resolveColor(theme, bg ?? "card"),
    "--finn-card-border-color": isBorderless
      ? "transparent"
      : `color-mix(in srgb, ${resolvedBorderColor} 68%, transparent)`,
    "--finn-card-border-style": isBorderless ? "none" : "solid",
    "--finn-card-border-width": isBorderless ? 0 : resolvedBorderWidth,
    "--finn-card-color": resolveColor(theme, "cardForeground"),
    "--finn-card-padding": resolveSpacing(theme, p),
    "--finn-card-radius": resolveRadius(theme, radius ?? component.radius ?? "lg"),
    "--finn-card-shadow":
      variant === "elevated"
        ? theme.tokens.shadow[shadow ?? component.shadow ?? "md"]
        : theme.tokens.shadow[shadow ?? (variant === "solid" ? component.shadow ?? "sm" : "none")],
    ...style
  };

  return createElement(
    as,
    {
      ...rest,
      className,
      "data-finn-ui-card": true,
      "data-variant": variant,
      style: resolvedStyle
    },
    children
  );
}
