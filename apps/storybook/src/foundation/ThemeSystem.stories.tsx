import type { Meta, StoryObj } from "@storybook/react-vite";
import { tokens } from "@finn-ui/tokens";
import { createTheme, createThemeCssVariables, darkTheme, lightTheme } from "@finn-ui/theme";
import { Badge, Button, Card, Stack, Text, UIProvider, useTheme } from "@finn-ui/react";

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
  title: "Foundation/Theme System",
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
        Theme values flow through shared tokens, createTheme, light/dark themes,
        UIProvider, and useTheme.
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

function ToolbarThemePreview() {
  const theme = useTheme();

  return (
    <Card data-testid="toolbar-theme-card" variant="elevated" style={{ width: 420, maxWidth: "100%" }}>
      <Stack gap="lg">
        <Stack gap="xs">
          <Text color="muted" data-testid="toolbar-theme-name" variant="caption">
            {theme.name}
          </Text>
          <Text variant="heading">Toolbar theme switcher</Text>
          <Text color="muted">
            This story uses the global Storybook toolbar and provider decorator.
          </Text>
        </Stack>
        <Stack direction="row" gap="sm" wrap="wrap">
          <Badge tone="success">Global decorator</Badge>
          <Badge tone="primary" variant="outline">CSS variables</Badge>
        </Stack>
        <Button data-testid="toolbar-theme-button">Themed action</Button>
      </Stack>
    </Card>
  );
}

const variablePreviewNames = [
  "--finn-color-background",
  "--finn-color-card",
  "--finn-color-primary",
  "--finn-color-border",
  "--finn-radius-lg",
  "--finn-spacing-lg",
  "--finn-component-card-shadow"
];

function CssVariablePreview() {
  const variables = createThemeCssVariables(customTheme);

  return (
    <UIProvider theme={customTheme}>
      <section
        style={{
          width: 520,
          borderRadius: "var(--finn-radius-xl)",
          background: "var(--finn-color-background)",
          color: "var(--finn-color-foreground)",
          fontFamily: "var(--finn-font-family-sans)",
          padding: "var(--finn-spacing-xl)"
        }}
      >
        <div
          style={{
            borderRadius: "var(--finn-component-card-radius)",
            background: "var(--finn-color-card)",
            boxShadow: "var(--finn-component-card-shadow)",
            padding: "var(--finn-spacing-lg)"
          }}
        >
          <p style={{ margin: 0, color: "var(--finn-color-muted)", fontSize: "var(--finn-font-size-sm)" }}>
            CSS variable runtime
          </p>
          <h2 style={{ margin: "8px 0 12px", fontSize: "var(--finn-font-size-xl)" }}>
            Theme object values are available as --finn-* variables.
          </h2>
          <div style={{ display: "grid", gap: "var(--finn-spacing-sm)" }}>
            {variablePreviewNames.map((name) => (
              <code
                key={name}
                style={{
                  borderRadius: "var(--finn-radius-md)",
                  background: "color-mix(in srgb, var(--finn-color-primary) 10%, transparent)",
                  color: "var(--finn-color-primary)",
                  display: "block",
                  fontFamily: "var(--finn-font-family-mono)",
                  fontSize: "var(--finn-font-size-sm)",
                  padding: "var(--finn-spacing-sm) var(--finn-spacing-md)"
                }}
              >
                {name}: {variables[name]}
              </code>
            ))}
          </div>
        </div>
      </section>
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

export const CssVariableRuntime: Story = {
  render: () => <CssVariablePreview />
};

export const ToolbarTheme: Story = {
  render: () => <ToolbarThemePreview />
};
