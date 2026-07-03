import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Divider, Stack, Text } from "@finn-ui/react";

const meta = {
  title: "Components/Primitives",
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function PrimitiveDemo() {
  return (
    <Box bg="card" color="foreground" radius="xl" shadow="sm">
      <div style={{ padding: "var(--finn-spacing-2xl)" }}>
        <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="caption" tone="muted">
              Finn UI primitives
            </Text>
            <Text variant="heading">Box, Text, and Stack</Text>
            <Text color="muted">
              These primitives resolve spacing, surface, color, and typography values from the active theme.
            </Text>
          </Stack>
          <Stack direction="row" gap="md" wrap="wrap">
            <Box bg="background" radius="lg" shadow="sm">
              <div style={{ padding: "var(--finn-spacing-lg)" }}>
                <Stack gap="sm">
                  <Text variant="label" tone="primary">
                    Box
                  </Text>
                  <Text variant="caption" color="muted">
                    Surface, spacing, radius, border, and shadow props.
                  </Text>
                </Stack>
              </div>
            </Box>
            <Box bg="background" radius="lg" shadow="sm">
              <div style={{ padding: "var(--finn-spacing-lg)" }}>
                <Stack gap="sm">
                  <Text variant="label" tone="success">
                    Text
                  </Text>
                  <Text variant="caption" color="muted">
                    Variants, tone, color, alignment, weight, and size.
                  </Text>
                </Stack>
              </div>
            </Box>
          </Stack>
        </Stack>
      </div>
    </Box>
  );
}

function PrimitiveRecipeDemo() {
  return (
    <Box bg="card" color="foreground" data-testid="primitive-recipe-box" p="2xl" radius="xl" shadow="sm">
      <Stack data-testid="primitive-recipe-stack" gap="lg">
        <Stack gap="xs">
          <Text data-testid="primitive-recipe-heading" variant="heading">
            Primitive recipes
          </Text>
          <Text color="muted">
            Box, Text, Stack, and Divider expose stable data attributes and inherit Finn CSS variables.
          </Text>
        </Stack>
        <Divider data-testid="primitive-recipe-divider" />
        <Stack direction="row" gap="md" wrap="wrap">
          <Box bg="background" borderColor="border" borderWidth="thin" p="lg" radius="lg">
            <Stack gap="xs">
              <Text variant="label" tone="primary">Box surface</Text>
              <Text variant="caption" color="muted">Spacing, radius, border, color, and shadow variables.</Text>
            </Stack>
          </Box>
          <Box bg="background" borderColor="border" borderWidth="thin" p="lg" radius="lg">
            <Stack gap="xs">
              <Text variant="label" tone="success">Stack layout</Text>
              <Text variant="caption" color="muted">Direction, gap, wrap, alignment, and justification variables.</Text>
            </Stack>
          </Box>
          <Stack direction="row" gap="sm" align="center">
            <Text variant="caption" color="muted">Vertical</Text>
            <Divider orientation="vertical" spacing="xs" />
            <Text variant="caption" color="muted">Divider</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export const Light: Story = {
  render: () => <PrimitiveDemo />
};

export const Dark: Story = {
  parameters: {
    finnTheme: "dark"
  },
  render: () => <PrimitiveDemo />
};

export const Custom: Story = {
  parameters: {
    finnTheme: "custom"
  },
  render: () => <PrimitiveDemo />
};

export const Recipes: Story = {
  render: () => <PrimitiveRecipeDemo />
};
