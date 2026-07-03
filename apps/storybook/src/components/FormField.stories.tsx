import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Card, FormField, Input, Stack, Text } from "@finn-ui/react";

const meta = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

function FormFieldDemo() {
  return (
    <Box bg="background" color="foreground" radius="xl">
      <Card variant="elevated" style={{ width: 420, maxWidth: "100%" }}>
        <div style={{ padding: "var(--finn-spacing-xl)" }}>
          <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">FormField</Text>
            <Text color="muted">Label, helper, required, and error copy for form controls.</Text>
          </Stack>
          <Stack gap="md">
            <FormField id="formfield-email" label="Email" helperText="Use your primary workspace email." required>
              <Input placeholder="hello@finn-ui.dev" defaultValue="hello@finn-ui.dev" />
            </FormField>
            <FormField id="formfield-name" label="Display name" helperText="Shown in shared workspace activity.">
              <Input placeholder="Display name" />
            </FormField>
            <FormField id="formfield-password" label="Password" error="Password is required." required>
              <Input placeholder="Password" type="password" />
            </FormField>
          </Stack>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Button>Save</Button>
            <Button variant="outline" tone="neutral">Cancel</Button>
          </Stack>
          </Stack>
        </div>
      </Card>
    </Box>
  );
}

export const Light: Story = {
  args: {
    children: <Input placeholder="Email" />
  },
  render: () => <FormFieldDemo />
};

export const Dark: Story = {
  args: {
    children: <Input placeholder="Email" />
  },
  parameters: {
    finnTheme: "dark"
  },
  render: () => <FormFieldDemo />
};

export const Custom: Story = {
  args: {
    children: <Input placeholder="Email" />
  },
  parameters: {
    finnTheme: "custom"
  },
  render: () => <FormFieldDemo />
};

export const Playground: Story = {
  args: {
    id: "formfield-playground",
    label: "Workspace name",
    helperText: "This label and helper text are connected to the control.",
    children: <Input placeholder="Finn workspace" />
  }
};
