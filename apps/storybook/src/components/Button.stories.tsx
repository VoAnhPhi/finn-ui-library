import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Stack, Text } from "@finn-ui/react";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["primary", "neutral", "danger", "success", "warning"] },
    variant: { control: "select", options: ["solid", "outline", "ghost", "soft", "link"] }
  },
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

function IconDot() {
  return <span aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: "currentColor" }} />;
}

function ButtonGrid() {
  return (
    <Box bg="card" color="foreground" data-testid="button-story-surface" radius="xl" shadow="sm">
      <div style={{ padding: "var(--finn-spacing-2xl)" }}>
        <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">Button</Text>
            <Text color="muted">Variants, tones, sizes, icons, loading, disabled, and full-width states.</Text>
          </Stack>
          <Stack direction="row" gap="md" wrap="wrap">
            <Button variant="solid" tone="primary">Solid</Button>
            <Button variant="outline" tone="primary">Outline</Button>
            <Button variant="ghost" tone="primary">Ghost</Button>
            <Button variant="soft" tone="primary">Soft</Button>
            <Button variant="link" tone="primary">Link</Button>
          </Stack>
          <Stack direction="row" gap="md" wrap="wrap">
            <Button tone="neutral">Neutral</Button>
            <Button tone="danger">Danger</Button>
            <Button tone="success">Success</Button>
            <Button tone="warning">Warning</Button>
          </Stack>
          <Stack direction="row" gap="md" align="center" wrap="wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button leftIcon={<IconDot />} rightIcon={<IconDot />}>With icons</Button>
          </Stack>
          <Stack gap="md">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full width</Button>
          </Stack>
        </Stack>
      </div>
    </Box>
  );
}

function ButtonStateMatrix() {
  return (
    <Box bg="card" color="foreground" radius="xl" shadow="sm">
      <div style={{ padding: "var(--finn-spacing-2xl)" }}>
        <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">Button recipes</Text>
            <Text color="muted">Recipe styling uses data attributes for variant, tone, size, loading, disabled, focus, hover, and active states.</Text>
          </Stack>
          <Stack direction="row" gap="md" wrap="wrap">
            <Button data-testid="button-recipe-solid">Default</Button>
            <Button data-testid="button-recipe-focus">Tab focus target</Button>
            <Button loading data-testid="button-recipe-loading">Loading</Button>
            <Button disabled data-testid="button-recipe-disabled">Disabled</Button>
          </Stack>
          <Stack direction="row" gap="md" wrap="wrap">
            <Button variant="outline" tone="neutral">Outline neutral</Button>
            <Button variant="soft" tone="success">Soft success</Button>
            <Button variant="ghost" tone="warning">Ghost warning</Button>
            <Button variant="link" tone="danger">Link danger</Button>
          </Stack>
        </Stack>
      </div>
    </Box>
  );
}

export const Light: Story = {
  render: () => <ButtonGrid />
};

export const Dark: Story = {
  parameters: {
    finnTheme: "dark"
  },
  render: () => <ButtonGrid />
};

export const Custom: Story = {
  parameters: {
    finnTheme: "custom"
  },
  render: () => <ButtonGrid />
};

export const Recipes: Story = {
  render: () => <ButtonStateMatrix />
};

export const Playground: Story = {
  args: {
    children: "Save changes",
    tone: "primary",
    variant: "solid",
    size: "md"
  }
};
