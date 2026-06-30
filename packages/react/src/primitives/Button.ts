import { createElement } from "react";
import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from "react";
import type { RadiusToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { resolveRadius } from "./style";

export type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "link";
export type ButtonTone = "primary" | "neutral" | "danger" | "success" | "warning";
export type ButtonSize = "sm" | "md" | "lg";

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">;

export type ButtonProps = NativeButtonProps & {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  radius?: RadiusToken | number;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: {
    minHeight: 32,
    padding: "0 12px",
    fontSize: 14
  },
  md: {
    minHeight: 40,
    padding: "0 16px",
    fontSize: 14
  },
  lg: {
    minHeight: 48,
    padding: "0 20px",
    fontSize: 16
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
  variant: ButtonVariant,
  tone: ButtonTone,
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

  if (variant === "soft") {
    return {
      background: softBackgroundByTone[tone],
      borderColor: "transparent",
      color: toneColor
    };
  }

  if (variant === "link") {
    return {
      background: "transparent",
      borderColor: "transparent",
      color: toneColor,
      minHeight: undefined,
      padding: 0,
      textDecoration: "underline",
      textUnderlineOffset: 3
    };
  }

  return {
    background: "transparent",
    borderColor: "transparent",
    color: toneColor
  };
}

function LoadingDot() {
  return createElement("span", {
    "aria-hidden": true,
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: "currentColor",
      opacity: 0.72
    }
  });
}

export function Button({
  variant = "solid",
  tone = "primary",
  size = "md",
  radius,
  fullWidth = false,
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  style,
  children,
  type = "button",
  ...rest
}: ButtonProps): ReactElement {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const componentRadius = radius ?? theme.components.Button.radius ?? "lg";
  const componentBorderWidth = theme.tokens.borderWidth[theme.components.Button.borderWidth ?? "thin"];
  const variantStyle = createVariantStyle(variant, tone, theme.colors);
  const resolvedStyle: CSSProperties = {
    alignItems: "center",
    appearance: "none",
    borderStyle: "solid",
    borderWidth: variant === "link" ? 0 : componentBorderWidth,
    borderRadius: resolveRadius(theme, componentRadius),
    boxSizing: "border-box",
    cursor: isDisabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    fontFamily: theme.tokens.typography.fontFamily.sans,
    fontWeight: theme.tokens.typography.fontWeight.semibold,
    gap: theme.tokens.spacing.sm,
    justifyContent: "center",
    lineHeight: 1,
    opacity: isDisabled ? theme.tokens.opacity.disabled : 1,
    transition: `background ${theme.tokens.duration.fast} ${theme.tokens.easing.standard}, border-color ${theme.tokens.duration.fast} ${theme.tokens.easing.standard}, color ${theme.tokens.duration.fast} ${theme.tokens.easing.standard}`,
    width: fullWidth ? "100%" : undefined,
    ...sizeStyles[size],
    ...variantStyle,
    ...style
  };

  return createElement(
    "button",
    {
      ...rest,
      "aria-busy": loading || undefined,
      disabled: isDisabled,
      style: resolvedStyle,
      type
    },
    loading ? createElement(LoadingDot) : leftIcon,
    children,
    rightIcon
  );
}
