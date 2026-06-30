import { createContext, createElement, useContext } from "react";
import type { ReactElement, ReactNode } from "react";
import { lightTheme } from "@finn-ui/theme";
import type { Theme } from "@finn-ui/theme";

const ThemeContext = createContext<Theme>(lightTheme);

export type UIProviderProps = {
  theme?: Theme;
  children: ReactNode;
};

export function UIProvider({ theme = lightTheme, children }: UIProviderProps): ReactElement {
  return createElement(ThemeContext.Provider, { value: theme }, children);
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
