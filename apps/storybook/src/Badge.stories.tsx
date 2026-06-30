import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Box, Stack, Text, UIProvider } from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";

const customTheme = createTheme({
  name: "badge custom",
  colors: {
    primary: "#0F766E",
    primaryForeground: "#FFFFFF",
    danger: "#BE123C",
    success: "#15803D",
    warning: "#B45309",
    card: "#F7FAF8",
    border: "#BCD7C8"
  }
});

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

function BadgeGrid() {
  return (
    <Box bg="background" color="foreground" p="xl" radius="xl" borderWidth="thin" borderColor="border">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text variant="heading">Badge</Text>
          <Text color="muted">Compact labels for status, category, and metadata.</Text>
        </Stack>
        <Stack direction="row" gap="sm" wrap="wrap">
          <Badge variant="solid" tone="primary">Solid</Badge>
          <Badge variant="soft" tone="primary">Soft</Badge>
          <Badge variant="outline" tone="primary">Outline</Badge>
        </Stack>
        <Stack direction="row" gap="sm" wrap="wrap">
          <Badge tone="primary">Primary</Badge>
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="danger">Danger</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
        </Stack>
        <Stack direction="row" gap="sm" align="center" wrap="wrap">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge radius="md">Radius md</Badge>
        </Stack>
      </Stack>
    </Box>
  );
}

function renderWithTheme(theme = lightTheme) {
  return (
    <UIProvider theme={theme}>
      <BadgeGrid />
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

export const Playground: Story = {
  args: {
    children: "Ready",
    tone: "success",
    variant: "soft",
    size: "sm"
  }
};
