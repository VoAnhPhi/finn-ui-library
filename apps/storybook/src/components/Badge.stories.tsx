import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Box, Stack, Text } from "@finn-ui/react";

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
    <Box bg="card" color="foreground" radius="xl" shadow="sm">
      <div style={{ padding: "var(--finn-spacing-2xl)" }}>
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
      </div>
    </Box>
  );
}

export const Light: Story = {
  render: () => <BadgeGrid />
};

export const Dark: Story = {
  parameters: {
    finnTheme: "dark"
  },
  render: () => <BadgeGrid />
};

export const Custom: Story = {
  parameters: {
    finnTheme: "custom"
  },
  render: () => <BadgeGrid />
};

export const Playground: Story = {
  args: {
    children: "Ready",
    tone: "success",
    variant: "soft",
    size: "sm"
  }
};
