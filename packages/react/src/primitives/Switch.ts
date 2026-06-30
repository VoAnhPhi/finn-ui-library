import { createElement } from "react";
import type { CSSProperties, InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { useTheme } from "../theme-context";

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
    color: disabled ? theme.colors.muted : theme.colors.foreground,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    fontFamily: theme.tokens.typography.fontFamily.sans,
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
    background: isChecked ? theme.colors[tone] : theme.tokens.colors.gray200,
    borderRadius: theme.tokens.radius.full,
    boxSizing: "border-box",
    display: "inline-flex",
    flexShrink: 0,
    height: dimensions.height,
    padding: dimensions.offset,
    transition: `background ${theme.tokens.duration.fast} ${theme.tokens.easing.standard}`,
    width: dimensions.width
  };
  const thumbStyle: CSSProperties = {
    background: theme.colors.background,
    borderRadius: theme.tokens.radius.full,
    boxShadow: theme.tokens.shadow.sm,
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
