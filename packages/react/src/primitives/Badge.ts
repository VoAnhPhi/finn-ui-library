import { createElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import type { RadiusToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { resolveColor, resolveRadius } from "./style";
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

function createVariantStyle(
  variant: BadgeVariant,
  tone: BadgeTone,
  theme: ReturnType<typeof useTheme>
): CSSProperties {
  const toneColor = resolveColor(theme, tone);
  const foreground = resolveColor(theme, foregroundByTone[tone]);

  if (variant === "solid") {
    return {
      background: toneColor,
      borderColor: "transparent",
      color: foreground
    };
  }

  if (variant === "outline") {
    return {
      background: "transparent",
      borderColor: `color-mix(in srgb, ${toneColor} 38%, transparent)`,
      color: toneColor
    };
  }

  return {
    background: `color-mix(in srgb, ${toneColor} 14%, transparent)`,
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
  const variantStyle = createVariantStyle(variant, tone, theme);
  const resolvedStyle: CSSProperties = {
    alignItems: "center",
    borderRadius: resolveRadius(theme, radius),
    borderStyle: "solid",
    borderWidth: "var(--finn-border-width-thin)",
    boxSizing: "border-box",
    display: "inline-flex",
    fontFamily: "var(--finn-font-family-sans)",
    fontWeight: "var(--finn-font-weight-semibold)",
    justifyContent: "center",
    lineHeight: 1,
    whiteSpace: "nowrap",
    ...sizeStyles[size],
    ...variantStyle,
    ...style
  };

  return createElement(as, { ...rest, style: resolvedStyle }, children);
}
