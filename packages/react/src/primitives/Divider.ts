import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement } from "react";
import type { SpacingToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { resolveColor, resolveSpacing } from "./style";
import type { ThemeColorValue } from "./style";

export type DividerOrientation = "horizontal" | "vertical";

type NativeDividerProps = Omit<HTMLAttributes<HTMLDivElement>, "color">;

export type DividerProps = NativeDividerProps & {
  orientation?: DividerOrientation;
  size?: number;
  color?: ThemeColorValue;
  spacing?: SpacingToken | number;
  style?: CSSProperties;
};

type RecipeStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;

export function Divider({
  orientation = "horizontal",
  size = 1,
  color = "border",
  spacing = "md",
  style,
  ...rest
}: DividerProps): ReactElement {
  const theme = useTheme();
  const resolvedSpacing = resolveSpacing(theme, spacing);
  const resolvedColor = resolveColor(theme, color);
  const dividerColor =
    color === "border" ? `color-mix(in srgb, ${resolvedColor} 70%, transparent)` : resolvedColor;
  const resolvedStyle: RecipeStyle = {
    "--finn-divider-color": dividerColor,
    "--finn-divider-size": `${size}px`,
    "--finn-divider-spacing": resolvedSpacing,
    ...style
  };

  return createElement("div", {
    ...rest,
    "aria-orientation": orientation,
    "data-finn-ui-divider": true,
    "data-orientation": orientation,
    role: "separator",
    style: resolvedStyle
  });
}
