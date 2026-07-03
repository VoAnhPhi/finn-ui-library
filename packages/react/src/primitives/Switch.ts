import { createElement } from "react";
import type { CSSProperties, InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { useTheme } from "../theme-context";
import { resolveColor } from "./style";

export type SwitchTone = "primary" | "neutral" | "danger" | "success" | "warning";
export type SwitchSize = "sm" | "md";

type NativeSwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "color">;

export type SwitchProps = NativeSwitchProps & {
  tone?: SwitchTone;
  size?: SwitchSize;
  label?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  style?: CSSProperties;
};

const sizeStyles = {
  sm: {
    height: 22,
    width: 38,
    thumb: 16,
    offset: 3,
    fontSize: 14
  },
  md: {
    height: 28,
    width: 48,
    thumb: 22,
    offset: 3,
    fontSize: 14
  }
} as const;

export function Switch({
  tone = "primary",
  size = "md",
  label,
  checked,
  defaultChecked,
  disabled,
  onChange,
  onCheckedChange,
  style,
  ...rest
}: SwitchProps): ReactElement {
  const theme = useTheme();
  const dimensions = sizeStyles[size];
  const isChecked = checked ?? defaultChecked ?? false;
  const rootStyle: CSSProperties = {
    alignItems: "center",
    color: disabled ? resolveColor(theme, "muted") : resolveColor(theme, "foreground"),
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    fontFamily: "var(--finn-font-family-sans)",
    fontSize: dimensions.fontSize,
    gap: theme.tokens.spacing.sm,
    lineHeight: theme.tokens.typography.lineHeight.normal,
    opacity: disabled ? theme.tokens.opacity.disabled : 1,
    position: "relative",
    ...style
  };
  const inputStyle: CSSProperties = {
    cursor: "inherit",
    inset: 0,
    margin: 0,
    opacity: 0,
    position: "absolute"
  };
  const trackStyle: CSSProperties = {
    alignItems: "center",
    background: isChecked ? resolveColor(theme, tone) : `color-mix(in srgb, ${resolveColor(theme, "border")} 70%, transparent)`,
    borderRadius: "var(--finn-radius-full)",
    boxSizing: "border-box",
    display: "inline-flex",
    flexShrink: 0,
    height: dimensions.height,
    padding: dimensions.offset,
    transition: `background ${theme.tokens.duration.fast} ${theme.tokens.easing.standard}`,
    width: dimensions.width
  };
  const thumbStyle: CSSProperties = {
    background: resolveColor(theme, "background"),
    borderRadius: "var(--finn-radius-full)",
    boxShadow: "var(--finn-shadow-sm)",
    height: dimensions.thumb,
    transform: `translateX(${isChecked ? dimensions.width - dimensions.thumb - dimensions.offset * 2 : 0}px)`,
    transition: `transform ${theme.tokens.duration.fast} ${theme.tokens.easing.standard}`,
    width: dimensions.thumb
  };

  return createElement(
    "label",
    { style: rootStyle },
    createElement("input", {
      ...rest,
      checked,
      defaultChecked,
      disabled,
      onChange: (event) => {
        onChange?.(event);
        onCheckedChange?.(event.currentTarget.checked);
      },
      role: "switch",
      style: inputStyle,
      type: "checkbox"
    }),
    createElement("span", { "aria-hidden": true, style: trackStyle }, createElement("span", { style: thumbStyle })),
    label ? createElement("span", null, label) : null
  );
}
