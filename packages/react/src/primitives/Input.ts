import { createElement } from "react";
import type { CSSProperties, InputHTMLAttributes, ReactElement, ReactNode } from "react";
import type { RadiusToken } from "@finn-ui/tokens";
import { useTheme } from "../theme-context";
import { resolveBorderWidth, resolveColor, resolveRadius } from "./style";

export type InputSize = "sm" | "md" | "lg";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color">;

export type InputProps = NativeInputProps & {
  size?: InputSize;
  radius?: RadiusToken | number;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: CSSProperties;
};

type RecipeStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;

const sizeStyles: Record<InputSize, RecipeStyle> = {
  sm: {
    "--finn-input-font-size": "14px",
    "--finn-input-min-height": "32px",
    "--finn-input-padding": "0 10px"
  },
  md: {
    "--finn-input-font-size": "14px",
    "--finn-input-min-height": "40px",
    "--finn-input-padding": "0 12px"
  },
  lg: {
    "--finn-input-font-size": "16px",
    "--finn-input-min-height": "48px",
    "--finn-input-padding": "0 14px"
  }
};

export function Input({
  size = "md",
  radius,
  error,
  leftIcon,
  rightIcon,
  disabled,
  readOnly,
  style,
  id,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: InputProps): ReactElement {
  const theme = useTheme();
  const inputId = id;
  const errorId = error && inputId ? `${inputId}-error` : undefined;
  const invalid = Boolean(error || rest["aria-invalid"]);
  const primaryColor = resolveColor(theme, "primary");
  const dangerColor = resolveColor(theme, "danger");
  const controlStyle: RecipeStyle = {
    "--finn-input-bg": disabled ? "var(--finn-token-color-gray-100)" : resolveColor(theme, "background"),
    "--finn-input-border-color": invalid
      ? `color-mix(in srgb, ${dangerColor} 70%, transparent)`
      : `color-mix(in srgb, ${resolveColor(theme, "border")} 72%, transparent)`,
    "--finn-input-border-width": resolveBorderWidth(theme, theme.components.Input.borderWidth ?? "thin"),
    "--finn-input-color": resolveColor(theme, "foreground"),
    "--finn-input-danger-color": dangerColor,
    "--finn-input-danger-ring": `color-mix(in srgb, ${dangerColor} 18%, transparent)`,
    "--finn-input-focus-color": primaryColor,
    "--finn-input-focus-ring": `color-mix(in srgb, ${primaryColor} 18%, transparent)`,
    "--finn-input-icon-color": invalid ? dangerColor : resolveColor(theme, "muted"),
    "--finn-input-radius": resolveRadius(theme, radius ?? theme.components.Input.radius ?? "md"),
    "--finn-input-readonly-bg": `color-mix(in srgb, ${resolveColor(theme, "muted")} 8%, transparent)`,
    ...sizeStyles[size]
  };
  const inputStyle: CSSProperties = {
    ...style
  };

  return createElement(
    "div",
    { "data-finn-ui-input-root": true },
    createElement(
      "div",
      {
        "data-disabled": disabled ? true : undefined,
        "data-finn-ui-input-control": true,
        "data-invalid": invalid ? true : undefined,
        "data-readonly": readOnly ? true : undefined,
        "data-size": size,
        style: controlStyle
      },
      leftIcon
        ? createElement("span", { "aria-hidden": true, "data-finn-ui-input-icon": true, "data-side": "left" }, leftIcon)
        : null,
      createElement("input", {
        ...rest,
        "aria-describedby": [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined,
        "aria-invalid": invalid ? true : rest["aria-invalid"],
        "data-finn-ui-input": true,
        disabled,
        id: inputId,
        readOnly,
        style: inputStyle
      }),
      rightIcon
        ? createElement("span", { "aria-hidden": true, "data-finn-ui-input-icon": true, "data-side": "right" }, rightIcon)
        : null
    ),
    error
      ? createElement(
          "div",
          {
            "data-finn-ui-input-error": true,
            id: errorId,
            role: "alert"
          },
          error
        )
      : null
  );
}
