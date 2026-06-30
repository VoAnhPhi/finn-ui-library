import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Card, Divider, Input, Stack, Text, UIProvider } from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";

const customTheme = createTheme({
  name: "form custom",
  colors: {
    primary: "#0F766E",
    card: "#ECFDF5",
    border: "#99F6E4",
    danger: "#BE123C"
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
  title: "Components/Form Surface",
  tags: ["autodocs"],
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
    <Box bg="background" color="foreground" p="xl" radius="xl" borderWidth="thin" borderColor="border">
      <Card variant="elevated" p="xl">
        <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">Account settings</Text>
            <Text color="muted">Input, Card, and Divider complete the first Finn UI component set.</Text>
          </Stack>
          <Divider />
          <Stack gap="md">
            <Input id="email" placeholder="Email" leftIcon={<IconDot />} defaultValue="hello@finn-ui.dev" />
            <Input placeholder="Display name" rightIcon={<IconDot />} />
            <Input placeholder="Password" type="password" error="Password is required" />
            <Input placeholder="Disabled" disabled />
          </Stack>
          <Stack direction="row" gap="md" align="center">
            <Button>Save</Button>
            <Button variant="outline" tone="neutral">Cancel</Button>
            <Divider orientation="vertical" spacing="sm" />
            <Text variant="caption" color="muted">Theme-aware controls</Text>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}

function renderWithTheme(theme = lightTheme) {
  return (
    <UIProvider theme={theme}>
      <FormSurfaceDemo />
    </UIProvider>
  );
}

export const Light: Story = {
  render: () => renderWithTheme(lightTheme)
};

export const Dark: Story = {
  render: () => renderWithTheme(darkTheme)
};

export const Custom: Story = {
  render: () => renderWithTheme(customTheme)
};
