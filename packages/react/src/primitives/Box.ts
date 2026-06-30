import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import { useTheme } from "../theme-context";
import { createSpacingStyle, createSurfaceStyle } from "./style";
import type { ResponsiveElement, SpacingStyleProps, SurfaceStyleProps } from "./style";

type NativeBoxProps = Omit<HTMLAttributes<HTMLElement>, "color">;

export type BoxProps = NativeBoxProps &
  SpacingStyleProps &
  SurfaceStyleProps & {
    as?: ResponsiveElement;
    children?: ReactNode;
    style?: CSSProperties;
  };

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
  const resolvedStyle: CSSProperties = {
    ...createSpacingStyle(theme, { p, px, py, m, mx, my }),
    ...createSurfaceStyle(theme, { bg, color, radius, borderWidth, borderColor, shadow }),
    ...style
  };

  return createElement(as, { ...rest, style: resolvedStyle }, children);
}
