import { cloneElement, createElement, isValidElement, useId } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import { useTheme } from "../theme-context";

type NativeFormFieldProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "id">;

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling";
};

export type FormFieldProps = NativeFormFieldProps & {
  id?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactElement<ControlProps>;
  style?: CSSProperties;
};

function joinIds(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(" ") || undefined;
}

export function FormField({
  id,
  label,
  helperText,
  error,
  required,
  children,
  style,
  ...rest
}: FormFieldProps): ReactElement {
  const theme = useTheme();
  const generatedId = useId();
  const childProps = isValidElement<ControlProps>(children) ? children.props : {};
  const controlId = id ?? childProps.id ?? generatedId;
  const helperId = helperText ? `${controlId}-helper` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = joinIds(childProps["aria-describedby"], helperId, errorId);

  const rootStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: theme.tokens.spacing.xs,
    width: "100%",
    ...style
  };
  const labelStyle: CSSProperties = {
    color: theme.colors.foreground,
    fontFamily: theme.tokens.typography.fontFamily.sans,
    fontSize: theme.tokens.typography.fontSize.sm,
    fontWeight: theme.tokens.typography.fontWeight.semibold,
    lineHeight: theme.tokens.typography.lineHeight.normal
  };
  const metaStyle: CSSProperties = {
    color: theme.colors.muted,
    fontFamily: theme.tokens.typography.fontFamily.sans,
    fontSize: theme.tokens.typography.fontSize.sm,
    lineHeight: theme.tokens.typography.lineHeight.normal
  };
  const errorStyle: CSSProperties = {
    ...metaStyle,
    color: theme.colors.danger
  };
  const control = cloneElement(children, {
    id: controlId,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : childProps["aria-invalid"]
  });

  return createElement(
    "div",
    { ...rest, style: rootStyle },
    label
      ? createElement(
          "label",
          { htmlFor: controlId, style: labelStyle },
          label,
          required
            ? createElement("span", { "aria-hidden": true, style: { color: theme.colors.danger } }, " *")
            : null
        )
      : null,
    control,
    helperText ? createElement("div", { id: helperId, style: metaStyle }, helperText) : null,
    error ? createElement("div", { id: errorId, role: "alert", style: errorStyle }, error) : null
  );
}
