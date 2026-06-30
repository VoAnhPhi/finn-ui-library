import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Card, Checkbox, FormField, Stack, Switch, Text, UIProvider } from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";

const customTheme = createTheme({
  name: "selection custom",
  colors: {
    primary: "#0F766E",
    card: "#ECFDF5",
    border: "#99F6E4",
    danger: "#BE123C",
    success: "#15803D",
    warning: "#B45309"
  },
  components: {
    Card: {
      radius: "xl",
      shadow: "md"
    }
  }
});

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
    <Box bg="background" color="foreground" p="xl" radius="xl" borderWidth="thin" borderColor="border">
      <Card variant="elevated" p="xl" style={{ width: 440, maxWidth: "100%" }}>
        <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">Selection controls</Text>
            <Text color="muted">Checkbox and Switch cover binary settings with the shared Finn UI theme.</Text>
          </Stack>
          <Stack gap="md">
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
      </Card>
    </Box>
  );
}

function renderWithTheme(theme = lightTheme) {
  return (
    <UIProvider theme={theme}>
      <SelectionControlsDemo />
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
