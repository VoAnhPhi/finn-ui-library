import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import { useTheme } from "../theme-context";
import { resolveSpacing } from "./style";
import type { ResponsiveElement } from "./style";
import type { SpacingToken } from "@finn-ui/tokens";

type NativeStackProps = Omit<HTMLAttributes<HTMLElement>, "style">;

export type StackProps = NativeStackProps & {
  as?: ResponsiveElement;
  direction?: "row" | "column";
  gap?: SpacingToken | number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: CSSProperties["flexWrap"];
  children?: ReactNode;
  style?: CSSProperties;
};

type RecipeStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;

export function Stack({
  as = "div",
  direction = "column",
  gap = "md",
  align,
  justify,
  wrap,
  style,
  children,
  ...rest
}: StackProps): ReactElement {
  const theme = useTheme();
  const resolvedStyle: RecipeStyle = {
    "--finn-stack-align": align,
    "--finn-stack-direction": direction,
    "--finn-stack-gap": resolveSpacing(theme, gap),
    "--finn-stack-justify": justify,
    "--finn-stack-wrap": wrap,
    ...style
  };

  return createElement(
    as,
    {
      ...rest,
      "data-direction": direction,
      "data-finn-ui-stack": true,
      style: resolvedStyle
    },
    children
  );
}
