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

const sizeStyles: Record<InputSize, CSSProperties> = {
  sm: {
    minHeight: 32,
    fontSize: 14,
    padding: "0 10px"
  },
  md: {
    minHeight: 40,
    fontSize: 14,
    padding: "0 12px"
  },
  lg: {
    minHeight: 48,
    fontSize: 16,
    padding: "0 14px"
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
  const borderColor = invalid
    ? `color-mix(in srgb, ${resolveColor(theme, "danger")} 70%, transparent)`
    : `color-mix(in srgb, ${resolveColor(theme, "border")} 72%, transparent)`;
  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--finn-spacing-xs)",
    width: "100%"
  };
  const controlStyle: CSSProperties = {
    alignItems: "center",
    background: disabled ? "var(--finn-token-color-gray-100)" : resolveColor(theme, "background"),
    borderColor,
    borderRadius: resolveRadius(theme, radius ?? theme.components.Input.radius ?? "md"),
    borderStyle: "solid",
    borderWidth: resolveBorderWidth(theme, theme.components.Input.borderWidth ?? "thin"),
    boxSizing: "border-box",
    color: resolveColor(theme, "foreground"),
    display: "flex",
    gap: "var(--finn-spacing-sm)",
    opacity: disabled ? theme.tokens.opacity.disabled : 1,
    width: "100%"
  };
  const inputStyle: CSSProperties = {
    ...sizeStyles[size],
    background: "transparent",
    border: 0,
    boxSizing: "border-box",
    color: "inherit",
    flex: 1,
    fontFamily: "var(--finn-font-family-sans)",
    minWidth: 0,
    outline: "none",
    width: "100%",
    ...style
  };
  const iconStyle: CSSProperties = {
    color: invalid ? resolveColor(theme, "danger") : resolveColor(theme, "muted"),
    display: "inline-flex",
    paddingLeft: leftIcon ? "var(--finn-spacing-md)" : 0,
    paddingRight: rightIcon ? "var(--finn-spacing-md)" : 0
  };

  return createElement(
    "div",
    { style: wrapperStyle },
    createElement(
      "div",
      { style: controlStyle },
      leftIcon ? createElement("span", { "aria-hidden": true, style: iconStyle }, leftIcon) : null,
      createElement("input", {
        ...rest,
        "aria-describedby": [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined,
        "aria-invalid": invalid ? true : rest["aria-invalid"],
        disabled,
        id: inputId,
        readOnly,
        style: inputStyle
      }),
      rightIcon ? createElement("span", { "aria-hidden": true, style: iconStyle }, rightIcon) : null
    ),
    error
      ? createElement(
          "div",
          {
            id: errorId,
            role: "alert",
            style: {
              color: resolveColor(theme, "danger"),
              fontFamily: "var(--finn-font-family-sans)",
              fontSize: "var(--finn-font-size-sm)",
              lineHeight: "var(--finn-line-height-normal)"
            }
          },
          error
        )
      : null
  );
}
