import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import type { RadiusToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { resolveRadius } from "./style";
import type { ResponsiveElement } from "./style";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeTone = "primary" | "neutral" | "danger" | "success" | "warning";
export type BadgeSize = "sm" | "md";

type NativeBadgeProps = Omit<HTMLAttributes<HTMLElement>, "color">;

export type BadgeProps = NativeBadgeProps & {
  as?: ResponsiveElement;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  radius?: RadiusToken | number;
  children?: ReactNode;
  style?: CSSProperties;
};

const sizeStyles: Record<BadgeSize, CSSProperties> = {
  sm: {
    fontSize: 12,
    minHeight: 22,
    padding: "0 8px"
  },
  md: {
    fontSize: 14,
    minHeight: 26,
    padding: "0 10px"
  }
};

const foregroundByTone = {
  primary: "primaryForeground",
  neutral: "neutralForeground",
  danger: "dangerForeground",
  success: "successForeground",
  warning: "warningForeground"
} as const;

const softBackgroundByTone = {
  primary: "rgb(37 99 235 / 0.12)",
  neutral: "rgb(55 65 81 / 0.1)",
  danger: "rgb(220 38 38 / 0.12)",
  success: "rgb(22 163 74 / 0.12)",
  warning: "rgb(245 158 11 / 0.16)"
} as const;

function createVariantStyle(
  variant: BadgeVariant,
  tone: BadgeTone,
  colors: ReturnType<typeof useTheme>["colors"]
): CSSProperties {
  const toneColor = colors[tone];
  const foreground = colors[foregroundByTone[tone]];

  if (variant === "solid") {
    return {
      background: toneColor,
      borderColor: toneColor,
      color: foreground
    };
  }

  if (variant === "outline") {
    return {
      background: "transparent",
      borderColor: toneColor,
      color: toneColor
    };
  }

  return {
    background: softBackgroundByTone[tone],
    borderColor: "transparent",
    color: toneColor
  };
}

export function Badge({
  as = "span",
  variant = "soft",
  tone = "primary",
  size = "sm",
  radius = "full",
  style,
  children,
  ...rest
}: BadgeProps): ReactElement {
  const theme = useTheme();
  const variantStyle = createVariantStyle(variant, tone, theme.colors);
  const resolvedStyle: CSSProperties = {
    alignItems: "center",
    borderRadius: resolveRadius(theme, radius),
    borderStyle: "solid",
    borderWidth: theme.tokens.borderWidth.thin,
    boxSizing: "border-box",
    display: "inline-flex",
    fontFamily: theme.tokens.typography.fontFamily.sans,
    fontWeight: theme.tokens.typography.fontWeight.semibold,
    justifyContent: "center",
    lineHeight: 1,
    whiteSpace: "nowrap",
    ...sizeStyles[size],
    ...variantStyle,
    ...style
  };

  return createElement(as, { ...rest, style: resolvedStyle }, children);
}
