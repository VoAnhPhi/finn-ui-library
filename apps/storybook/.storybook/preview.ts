import { createElement } from "react";
import type { Preview } from "@storybook/react-vite";
import { UIProvider } from "@finn-ui/react";
import { storybookThemes } from "../src/storybookThemes";
import type { StorybookThemeName } from "../src/storybookThemes";

const preview: Preview = {
  globalTypes: {
    finnTheme: {
      name: "Theme",
      description: "Finn UI theme used by the global UIProvider decorator.",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "custom", title: "Custom" }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    finnTheme: "light"
  },
  decorators: [
    (Story, context) => {
      const themeName = (context.parameters.finnTheme ?? context.globals.finnTheme ?? "light") as StorybookThemeName;
      const theme = storybookThemes[themeName] ?? storybookThemes.light;

      return createElement(
        UIProvider,
        {
          "data-testid": "storybook-theme-provider",
          style: { minHeight: "100%" },
          theme
        },
        createElement(Story)
      );
    }
  ],
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*"
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
