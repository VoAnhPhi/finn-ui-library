import { createContext, createElement, useContext } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react";
import { createThemeCssVariables, lightTheme } from "@finn-ui/theme";
import type { Theme } from "@finn-ui/theme";
import { finnUiRecipeCss } from "./recipes";

const ThemeContext = createContext<Theme>(lightTheme);

export type UIProviderProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  theme?: Theme;
  children: ReactNode;
};

export function UIProvider({
  theme = lightTheme,
  children,
  style,
  ...rest
}: UIProviderProps): ReactElement {
  const themeStyle: CSSProperties = {
    ...(createThemeCssVariables(theme) as CSSProperties),
    color: "var(--finn-color-foreground)",
    fontFamily: "var(--finn-font-family-sans)",
    ...style
  };

  return createElement(
    ThemeContext.Provider,
    { value: theme },
    createElement(
      "div",
      {
        ...rest,
        "data-finn-theme": theme.name,
        style: themeStyle
      },
      createElement("style", { "data-finn-ui-recipes": true }, finnUiRecipeCss),
      children
    )
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
