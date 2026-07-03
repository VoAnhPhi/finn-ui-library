import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Stack, Text, UIProvider } from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";

const customTheme = createTheme({
  name: "custom green",
  colors: {
    primary: "#0F766E",
    card: "#ECFDF5",
    border: "#99F6E4"
  },
  components: {
    Card: {
      radius: "xl",
      shadow: "md"
    }
  }
});

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

function renderWithTheme(theme = lightTheme) {
  return (
    <UIProvider theme={theme}>
      <PrimitiveDemo />
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
