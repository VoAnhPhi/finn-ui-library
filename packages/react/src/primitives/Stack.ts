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
  const resolvedStyle: CSSProperties = {
    display: "flex",
    flexDirection: direction,
    gap: resolveSpacing(theme, gap),
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    ...style
  };

  return createElement(as, { ...rest, style: resolvedStyle }, children);
}
