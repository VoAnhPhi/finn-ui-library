import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import type { RadiusToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { resolveColor, resolveRadius } from "./style";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarTone = "primary" | "neutral" | "danger" | "success" | "warning";

type NativeAvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, "color">;

export type AvatarProps = NativeAvatarProps & {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: AvatarSize;
  tone?: AvatarTone;
  radius?: RadiusToken | number;
  style?: CSSProperties;
};

const sizeStyles: Record<AvatarSize, { box: number; fontSize: number }> = {
  sm: {
    box: 28,
    fontSize: 12
  },
  md: {
    box: 36,
    fontSize: 14
  },
  lg: {
    box: 48,
    fontSize: 16
  },
  xl: {
    box: 64,
    fontSize: 20
  }
};

const foregroundByTone = {
  primary: "primaryForeground",
  neutral: "neutralForeground",
  danger: "dangerForeground",
  success: "successForeground",
  warning: "warningForeground"
} as const;

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  tone = "neutral",
  radius = "full",
  style,
  ...rest
}: AvatarProps): ReactElement {
  const theme = useTheme();
  const dimensions = sizeStyles[size];
  const resolvedStyle: CSSProperties = {
    alignItems: "center",
    background: resolveColor(theme, tone),
    borderRadius: resolveRadius(theme, radius),
    boxSizing: "border-box",
    color: resolveColor(theme, foregroundByTone[tone]),
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: "var(--finn-font-family-sans)",
    fontSize: dimensions.fontSize,
    fontWeight: theme.tokens.typography.fontWeight.semibold,
    height: dimensions.box,
    justifyContent: "center",
    lineHeight: 1,
    overflow: "hidden",
    textTransform: "uppercase",
    userSelect: "none",
    width: dimensions.box,
    ...style
  };

  return createElement(
    "span",
    { ...rest, style: resolvedStyle },
    src
      ? createElement("img", {
          alt: alt ?? "",
          src,
          style: {
            display: "block",
            height: "100%",
            objectFit: "cover",
            width: "100%"
          }
        })
      : fallback
  );
}
