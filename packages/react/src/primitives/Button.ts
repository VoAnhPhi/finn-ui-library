import { createElement } from "react";
import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from "react";
import type { RadiusToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { resolveBorderWidth, resolveColor, resolveRadius } from "./style";

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

type RecipeStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;

const sizeStyles: Record<ButtonSize, RecipeStyle> = {
  sm: {
    "--finn-button-min-height": "32px",
    "--finn-button-padding": "0 12px",
    fontSize: 14
  },
  md: {
    "--finn-button-min-height": "40px",
    "--finn-button-padding": "0 16px",
    fontSize: 14
  },
  lg: {
    "--finn-button-min-height": "48px",
    "--finn-button-padding": "0 20px",
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

function createVariantStyle(
  variant: ButtonVariant,
  tone: ButtonTone,
  theme: ReturnType<typeof useTheme>
): RecipeStyle {
  const toneColor = resolveColor(theme, tone);
  const foreground = resolveColor(theme, foregroundByTone[tone]);
  const softTone = `color-mix(in srgb, ${toneColor} 14%, transparent)`;
  const hoverTone = `color-mix(in srgb, ${toneColor} 20%, transparent)`;
  const activeTone = `color-mix(in srgb, ${toneColor} 88%, black)`;
  const subtleToneBorder = `color-mix(in srgb, ${toneColor} 42%, transparent)`;
  const strongerToneBorder = `color-mix(in srgb, ${toneColor} 58%, transparent)`;

  if (variant === "solid") {
    return {
      "--finn-button-bg": toneColor,
      "--finn-button-border-color": "transparent",
      "--finn-button-color": foreground,
      "--finn-button-hover-bg": activeTone,
      "--finn-button-hover-border-color": "transparent",
      "--finn-button-hover-shadow": "var(--finn-shadow-sm)"
    };
  }

  if (variant === "outline") {
    return {
      "--finn-button-bg": "transparent",
      "--finn-button-border-color": subtleToneBorder,
      "--finn-button-color": toneColor,
      "--finn-button-hover-bg": hoverTone,
      "--finn-button-hover-border-color": strongerToneBorder
    };
  }

  if (variant === "soft") {
    return {
      "--finn-button-bg": softTone,
      "--finn-button-border-color": "transparent",
      "--finn-button-color": toneColor,
      "--finn-button-hover-bg": hoverTone,
      "--finn-button-hover-border-color": "transparent"
    };
  }

  if (variant === "link") {
    return {
      "--finn-button-bg": "transparent",
      "--finn-button-border-color": "transparent",
      "--finn-button-border-width": 0,
      "--finn-button-color": toneColor,
      "--finn-button-hover-bg": "transparent",
      "--finn-button-hover-border-color": "transparent",
      "--finn-button-text-decoration": "underline"
    };
  }

  return {
    "--finn-button-bg": "transparent",
    "--finn-button-border-color": "transparent",
    "--finn-button-color": toneColor,
    "--finn-button-hover-bg": hoverTone,
    "--finn-button-hover-border-color": "transparent"
  };
}

function LoadingDot() {
  return createElement("span", {
    "aria-hidden": true,
    "data-finn-ui-button-dot": true
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
  className,
  style,
  children,
  type = "button",
  ...rest
}: ButtonProps): ReactElement {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const componentRadius = radius ?? theme.components.Button.radius ?? "lg";
  const componentBorderWidth = resolveBorderWidth(theme, theme.components.Button.borderWidth ?? "thin");
  const variantStyle = createVariantStyle(variant, tone, theme);
  const resolvedStyle: RecipeStyle = {
    "--finn-button-border-width": variant === "link" ? 0 : componentBorderWidth,
    "--finn-button-focus-color": resolveColor(theme, tone),
    "--finn-button-radius": resolveRadius(theme, componentRadius),
    "--finn-button-width": fullWidth ? "100%" : undefined,
    ...sizeStyles[size],
    ...variantStyle,
    ...style
  };

  return createElement(
    "button",
    {
      ...rest,
      "aria-busy": loading || undefined,
      className,
      "data-finn-ui-button": true,
      "data-loading": loading ? true : undefined,
      "data-size": size,
      "data-tone": tone,
      "data-variant": variant,
      disabled: isDisabled,
      style: resolvedStyle,
      type
    },
    loading ? createElement(LoadingDot) : leftIcon,
    children,
    rightIcon
  );
}
