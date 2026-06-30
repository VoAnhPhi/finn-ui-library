import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement } from "react";
import type { RadiusToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { resolveRadius } from "./style";

export type SkeletonProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: RadiusToken | number;
  circle?: boolean;
  animated?: boolean;
  style?: CSSProperties;
};

export function Skeleton({
  width = "100%",
  height = 16,
  radius = "md",
  circle = false,
  animated = true,
  style,
  ...rest
}: SkeletonProps): ReactElement {
  const theme = useTheme();
  const baseColor = theme.tokens.colors.gray200;
  const highlightColor = theme.tokens.colors.gray100;
  const resolvedStyle: CSSProperties = {
    animation: animated ? `finn-ui-skeleton-pulse 1.4s ${theme.tokens.easing.standard} infinite` : undefined,
    background: animated
      ? `linear-gradient(90deg, ${baseColor} 0%, ${highlightColor} 50%, ${baseColor} 100%)`
      : baseColor,
    backgroundSize: animated ? "200% 100%" : undefined,
    borderRadius: circle ? theme.tokens.radius.full : resolveRadius(theme, radius),
    display: "block",
    flexShrink: 0,
    height,
    overflow: "hidden",
    width,
    ...style
  };

  return createElement(
    "span",
    {
      ...rest,
      "aria-hidden": rest["aria-hidden"] ?? true,
      style: resolvedStyle
    },
    animated
      ? createElement("style", null, "@keyframes finn-ui-skeleton-pulse{0%{background-position:200% 0}100%{background-position:-200% 0}}")
      : null
  );
}
