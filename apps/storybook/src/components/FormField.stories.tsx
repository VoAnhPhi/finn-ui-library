import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Card, FormField, Input, Stack, Text, UIProvider } from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";

const customTheme = createTheme({
  name: "form field custom",
  colors: {
    primary: "#0F766E",
    card: "#ECFDF5",
    border: "#99F6E4",
    danger: "#BE123C",
    muted: "#567066"
  },
  components: {
    Input: {
      radius: "lg"
    },
    Card: {
      radius: "xl",
      shadow: "md"
    }
  }
});

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

function renderWithTheme(theme = lightTheme) {
  return (
    <UIProvider theme={theme}>
      <FormFieldDemo />
    </UIProvider>
  );
}

export const Light: Story = {
  args: {
    children: <Input placeholder="Email" />
  },
  render: () => renderWithTheme(lightTheme)
};

export const Dark: Story = {
  args: {
    children: <Input placeholder="Email" />
  },
  render: () => renderWithTheme(darkTheme)
};

export const Custom: Story = {
  args: {
    children: <Input placeholder="Email" />
  },
  render: () => renderWithTheme(customTheme)
};

export const Playground: Story = {
  args: {
    id: "formfield-playground",
    label: "Workspace name",
    helperText: "This label and helper text are connected to the control.",
    children: <Input placeholder="Finn workspace" />
  }
};
