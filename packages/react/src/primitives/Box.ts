import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import { useTheme } from "../theme-context";
import { resolveBorderWidth, resolveColor, resolveRadius, resolveSpacing } from "./style";
import type { ResponsiveElement, SpacingStyleProps, SurfaceStyleProps } from "./style";

type NativeBoxProps = Omit<HTMLAttributes<HTMLElement>, "color">;

export type BoxProps = NativeBoxProps &
  SpacingStyleProps &
  SurfaceStyleProps & {
    as?: ResponsiveElement;
    children?: ReactNode;
    style?: CSSProperties;
  };

type RecipeStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;

export function Box({
  as = "div",
  p,
  px,
  py,
  m,
  mx,
  my,
  bg,
  color,
  radius,
  borderWidth,
  borderColor,
  shadow,
  style,
  children,
  ...rest
}: BoxProps): ReactElement {
  const theme = useTheme();
  const resolvedBorderWidth = resolveBorderWidth(theme, borderWidth);
  const resolvedPadding = resolveSpacing(theme, p);
  const resolvedPaddingX = resolveSpacing(theme, px) ?? resolvedPadding;
  const resolvedPaddingY = resolveSpacing(theme, py) ?? resolvedPadding;
  const resolvedMargin = resolveSpacing(theme, m);
  const resolvedMarginX = resolveSpacing(theme, mx) ?? resolvedMargin;
  const resolvedMarginY = resolveSpacing(theme, my) ?? resolvedMargin;
  const resolvedStyle: RecipeStyle = {
    "--finn-box-bg": resolveColor(theme, bg),
    "--finn-box-border-color":
      resolvedBorderWidth == null || resolvedBorderWidth === 0
        ? resolveColor(theme, borderColor)
        : `color-mix(in srgb, ${resolveColor(theme, borderColor) ?? "transparent"} 68%, transparent)`,
    "--finn-box-border-style": resolvedBorderWidth == null || resolvedBorderWidth === 0 ? "none" : "solid",
    "--finn-box-border-width": resolvedBorderWidth,
    "--finn-box-color": resolveColor(theme, color),
    "--finn-box-margin-bottom": resolvedMarginY,
    "--finn-box-margin-left": resolvedMarginX,
    "--finn-box-margin-right": resolvedMarginX,
    "--finn-box-margin-top": resolvedMarginY,
    "--finn-box-padding-bottom": resolvedPaddingY,
    "--finn-box-padding-left": resolvedPaddingX,
    "--finn-box-padding-right": resolvedPaddingX,
    "--finn-box-padding-top": resolvedPaddingY,
    "--finn-box-radius": resolveRadius(theme, radius),
    "--finn-box-shadow": shadow == null ? undefined : theme.tokens.shadow[shadow],
    ...style
  };

  return createElement(as, { ...rest, "data-finn-ui-box": true, style: resolvedStyle }, children);
}
