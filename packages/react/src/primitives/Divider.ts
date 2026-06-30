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
  const resolvedStyle: CSSProperties =
    orientation === "vertical"
      ? {
          alignSelf: "stretch",
          background: resolveColor(theme, color),
          display: "inline-block",
          marginLeft: resolvedSpacing,
          marginRight: resolvedSpacing,
          minHeight: 24,
          width: size,
          ...style
        }
      : {
          background: resolveColor(theme, color),
          display: "block",
          height: size,
          marginBottom: resolvedSpacing,
          marginTop: resolvedSpacing,
          width: "100%",
          ...style
        };

  return createElement("div", { ...rest, "aria-orientation": orientation, role: "separator", style: resolvedStyle });
}
