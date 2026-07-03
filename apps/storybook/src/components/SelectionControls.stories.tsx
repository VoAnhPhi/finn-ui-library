import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Card, Checkbox, FormField, Stack, Switch, Text } from "@finn-ui/react";

const meta = {
  title: "Components/Selection Controls",
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function SelectionControlsDemo() {
  return (
    <Box bg="background" color="foreground" radius="xl">
      <Card variant="elevated" style={{ width: 440, maxWidth: "100%" }}>
        <div style={{ padding: "var(--finn-spacing-xl)" }}>
          <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">Selection controls</Text>
            <Text color="muted">Checkbox and Switch cover binary settings with the shared Finn UI theme.</Text>
          </Stack>
          <Stack gap="lg">
            <FormField id="selection-terms" label="Agreements" helperText="Checkbox uses the native checkbox input.">
              <Checkbox defaultChecked tone="success" label="Accept workspace terms" />
            </FormField>
            <FormField id="selection-newsletter" label="Notifications" helperText="Switch uses role=switch on a native checkbox.">
              <Switch defaultChecked tone="primary" label="Email notifications" />
            </FormField>
            <Stack direction="row" gap="lg" wrap="wrap">
              <Checkbox size="sm" label="Small" />
              <Checkbox tone="danger" label="Danger" />
              <Checkbox disabled label="Disabled" />
            </Stack>
            <Stack direction="row" gap="lg" wrap="wrap">
              <Switch size="sm" label="Small" />
              <Switch tone="warning" defaultChecked label="Warning" />
              <Switch disabled label="Disabled" />
            </Stack>
          </Stack>
          <Button>Save preferences</Button>
          </Stack>
        </div>
      </Card>
    </Box>
  );
}

export const Light: Story = {
  render: () => <SelectionControlsDemo />
};

export const Dark: Story = {
  parameters: {
    finnTheme: "dark"
  },
  render: () => <SelectionControlsDemo />
};

export const Custom: Story = {
  parameters: {
    finnTheme: "custom"
  },
  render: () => <SelectionControlsDemo />
};
