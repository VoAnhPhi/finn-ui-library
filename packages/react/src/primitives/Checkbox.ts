import { createElement } from "react";
import type { CSSProperties, InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { useTheme } from "../theme-context";
import { resolveColor } from "./style";

export type CheckboxTone = "primary" | "neutral" | "danger" | "success" | "warning";
export type CheckboxSize = "sm" | "md";

type NativeCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "color">;

export type CheckboxProps = NativeCheckboxProps & {
  tone?: CheckboxTone;
  size?: CheckboxSize;
  label?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  style?: CSSProperties;
};

const sizeStyles = {
  sm: {
    box: 16,
    mark: 8,
    fontSize: 14
  },
  md: {
    box: 20,
    mark: 10,
    fontSize: 14
  }
} as const;

export function Checkbox({
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
}: CheckboxProps): ReactElement {
  const theme = useTheme();
  const dimensions = sizeStyles[size];
  const isChecked = checked ?? defaultChecked ?? false;
  const toneColor = resolveColor(theme, tone);
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
  const boxStyle: CSSProperties = {
    alignItems: "center",
    background: isChecked ? toneColor : resolveColor(theme, "background"),
    borderColor: isChecked ? "transparent" : `color-mix(in srgb, ${resolveColor(theme, "border")} 76%, transparent)`,
    borderRadius: "var(--finn-radius-sm)",
    borderStyle: "solid",
    borderWidth: "var(--finn-border-width-thin)",
    boxSizing: "border-box",
    color: resolveColor(theme, `${tone}Foreground`),
    display: "inline-flex",
    flexShrink: 0,
    height: dimensions.box,
    justifyContent: "center",
    transition: `background ${theme.tokens.duration.fast} ${theme.tokens.easing.standard}, border-color ${theme.tokens.duration.fast} ${theme.tokens.easing.standard}`,
    width: dimensions.box
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
      style: inputStyle,
      type: "checkbox"
    }),
    createElement(
      "span",
      { "aria-hidden": true, style: boxStyle },
      isChecked
        ? createElement("span", {
            style: {
              borderBottom: `${Math.max(2, Math.round(dimensions.mark / 4))}px solid currentColor`,
              borderRight: `${Math.max(2, Math.round(dimensions.mark / 4))}px solid currentColor`,
              height: dimensions.mark,
              transform: "rotate(45deg) translateY(-1px)",
              width: Math.round(dimensions.mark / 2)
            }
          })
        : null
    ),
    label ? createElement("span", null, label) : null
  );
}
