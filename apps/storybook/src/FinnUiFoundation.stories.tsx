import type { Meta, StoryObj } from "@storybook/react-vite";
import { tokens } from "@finn-ui/tokens";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";
import { UIProvider, useTheme } from "@finn-ui/react";

const customTheme = createTheme({
  name: "custom violet",
  colors: {
    primary: "#7C3AED",
    border: "#DDD6FE",
    card: "#F5F3FF"
  },
  components: {
    Button: {
      radius: "xl"
    },
    Card: {
      shadow: "md"
    }
  }
});

const meta = {
  title: "Foundation/Phase 2",
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function ThemePreview() {
  const theme = useTheme();

  return (
    <main
      style={{
        width: 420,
        borderRadius: theme.tokens.radius[theme.components.Card.radius ?? "lg"],
        border: `${theme.tokens.borderWidth.thin}px solid ${theme.colors.border}`,
        background: theme.colors.card,
        color: theme.colors.cardForeground,
        boxShadow: theme.tokens.shadow[theme.components.Card.shadow ?? "none"],
        fontFamily: theme.tokens.typography.fontFamily.sans,
        padding: theme.tokens.spacing.xl
      }}
    >
      <p style={{ margin: 0, color: theme.colors.muted, fontSize: tokens.typography.fontSize.sm }}>
        {theme.name}
      </p>
      <h1 style={{ margin: "8px 0 12px", fontSize: tokens.typography.fontSize.xl }}>
        Finn UI theme foundation
      </h1>
      <p style={{ color: theme.colors.muted, lineHeight: tokens.typography.lineHeight.normal }}>
        Phase 2 exposes shared tokens, createTheme, light/dark themes, UIProvider,
        and useTheme before component primitives arrive in Phase 3.
      </p>
      <button
        type="button"
        style={{
          border: 0,
          borderRadius: theme.tokens.radius[theme.components.Button.radius ?? "lg"],
          background: theme.colors.primary,
          color: theme.colors.primaryForeground,
          cursor: "default",
          fontWeight: theme.tokens.typography.fontWeight.semibold,
          padding: `${theme.tokens.spacing.md}px ${theme.tokens.spacing.lg}px`
        }}
      >
        Themed button preview
      </button>
    </main>
  );
}

function renderTheme(theme = lightTheme) {
  return (
    <UIProvider theme={theme}>
      <ThemePreview />
    </UIProvider>
  );
}

export const LightTheme: Story = {
  render: () => renderTheme(lightTheme)
};

export const DarkTheme: Story = {
  render: () => renderTheme(darkTheme)
};

export const CustomTheme: Story = {
  render: () => renderTheme(customTheme)
};
