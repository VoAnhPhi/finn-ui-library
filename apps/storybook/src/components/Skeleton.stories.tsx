import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, Box, Card, Skeleton, Stack, Text, UIProvider } from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";

const customTheme = createTheme({
  name: "skeleton custom",
  colors: {
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
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

function SkeletonDemo() {
  return (
    <Box bg="background" color="foreground" p="xl" radius="xl" borderWidth="thin" borderColor="border">
      <Card variant="elevated" p="xl" style={{ width: 420, maxWidth: "100%" }}>
        <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">Skeleton</Text>
            <Text color="muted">Loading placeholders for cards, lists, and profile surfaces.</Text>
          </Stack>
          <Stack gap="md">
            <Stack direction="row" gap="md" align="center">
              <Skeleton circle width={48} height={48} />
              <Stack gap="xs" style={{ flex: 1 }}>
                <Skeleton width="65%" height={16} />
                <Skeleton width="42%" height={12} />
              </Stack>
            </Stack>
            <Skeleton height={120} radius="lg" />
            <Stack gap="sm">
              <Skeleton height={14} />
              <Skeleton width="88%" height={14} />
              <Skeleton width="72%" height={14} />
            </Stack>
          </Stack>
          <Stack direction="row" gap="md" align="center">
            <Avatar fallback="FU" tone="primary" />
            <Skeleton animated={false} width={120} height={16} />
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}

function renderWithTheme(theme = lightTheme) {
  return (
    <UIProvider theme={theme}>
      <SkeletonDemo />
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
    height: 24,
    width: 180
  }
};
