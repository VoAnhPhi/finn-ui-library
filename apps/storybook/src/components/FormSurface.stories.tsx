import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Card, Checkbox, Divider, FormField, Input, Stack, Switch, Text } from "@finn-ui/react";

const meta = {
  title: "Components/Form Surface",
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "form action" }
  },
  parameters: {
    layout: "centered"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function IconDot() {
  return <span aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: "currentColor" }} />;
}

function FormSurfaceDemo() {
  return (
    <Box bg="background" color="foreground" radius="xl">
      <Card variant="elevated">
        <div style={{ padding: "var(--finn-spacing-xl)" }}>
          <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">Account settings</Text>
            <Text color="muted">Input, Card, and Divider complete the first Finn UI component set.</Text>
          </Stack>
          <Divider />
          <Stack gap="md">
            <FormField id="email" label="Email" helperText="Use your primary workspace email." required>
              <Input placeholder="Email" leftIcon={<IconDot />} defaultValue="hello@finn-ui.dev" />
            </FormField>
            <FormField id="display-name" label="Display name">
              <Input placeholder="Display name" rightIcon={<IconDot />} />
            </FormField>
            <FormField id="password" label="Password" error="Password is required." required>
              <Input placeholder="Password" type="password" />
            </FormField>
            <FormField id="disabled-field" label="Disabled">
              <Input placeholder="Disabled" disabled />
            </FormField>
            <Checkbox tone="success" defaultChecked label="Send account updates" />
            <Switch tone="primary" defaultChecked label="Enable workspace alerts" />
          </Stack>
          <Stack direction="row" gap="md" align="center">
            <Button>Save</Button>
            <Button variant="outline" tone="neutral">Cancel</Button>
            <Divider orientation="vertical" spacing="sm" />
            <Text variant="caption" color="muted">Theme-aware controls</Text>
          </Stack>
          </Stack>
        </div>
      </Card>
    </Box>
  );
}

function RecipeSurfaceDemo() {
  return (
    <Box bg="background" color="foreground" radius="xl">
      <div style={{ padding: "var(--finn-spacing-xl)" }}>
        <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">Input and Card recipes</Text>
            <Text color="muted">Recipe states are driven by data attributes and inherited Finn CSS variables.</Text>
          </Stack>
          <Stack direction="row" gap="md" wrap="wrap">
            <Card variant="outline" style={{ width: 220 }}>
              <Stack gap="xs">
                <Text variant="label">Outline</Text>
                <Text variant="caption" color="muted">Soft border surface.</Text>
              </Stack>
            </Card>
            <Card variant="solid" style={{ width: 220 }}>
              <Stack gap="xs">
                <Text variant="label">Solid</Text>
                <Text variant="caption" color="muted">Filled theme surface.</Text>
              </Stack>
            </Card>
            <Card variant="elevated" style={{ width: 220 }}>
              <Stack gap="xs">
                <Text variant="label">Elevated</Text>
                <Text variant="caption" color="muted">Shadow as hierarchy.</Text>
              </Stack>
            </Card>
            <Card variant="ghost" style={{ width: 220 }}>
              <Stack gap="xs">
                <Text variant="label">Ghost</Text>
                <Text variant="caption" color="muted">No framed surface.</Text>
              </Stack>
            </Card>
          </Stack>
          <Card variant="elevated" style={{ width: 520, maxWidth: "100%" }}>
            <Stack gap="md">
              <Input data-testid="input-recipe-default" placeholder="Default input" defaultValue="hello@finn-ui.dev" leftIcon={<IconDot />} />
              <Input data-testid="input-recipe-readonly" placeholder="Read only input" defaultValue="Read-only value" readOnly />
              <Input data-testid="input-recipe-error" placeholder="Invalid input" error="Use a valid workspace email." />
              <Input data-testid="input-recipe-disabled" placeholder="Disabled input" disabled />
            </Stack>
          </Card>
        </Stack>
      </div>
    </Box>
  );
}

export const Light: Story = {
  render: () => <FormSurfaceDemo />
};

export const Dark: Story = {
  parameters: {
    finnTheme: "dark"
  },
  render: () => <FormSurfaceDemo />
};

export const Custom: Story = {
  parameters: {
    finnTheme: "custom"
  },
  render: () => <FormSurfaceDemo />
};

export const Recipes: Story = {
  render: () => <RecipeSurfaceDemo />
};
