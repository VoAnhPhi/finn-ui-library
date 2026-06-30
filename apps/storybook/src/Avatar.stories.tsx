import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, Badge, Box, Card, Stack, Text, UIProvider } from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";

const customTheme = createTheme({
  name: "avatar custom",
  colors: {
    primary: "#0F766E",
    primaryForeground: "#FFFFFF",
    neutral: "#E8F2ED",
    neutralForeground: "#14211B",
    danger: "#BE123C",
    success: "#15803D",
    warning: "#B45309",
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
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

function AvatarDemo() {
  return (
    <Box bg="background" color="foreground" p="xl" radius="xl" borderWidth="thin" borderColor="border">
      <Card variant="elevated" p="xl">
        <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="heading">Avatar</Text>
            <Text color="muted">User and workspace identity with image and fallback states.</Text>
          </Stack>
          <Stack direction="row" gap="md" align="center" wrap="wrap">
            <Avatar fallback="AP" tone="primary" />
            <Avatar fallback="FI" tone="success" />
            <Avatar fallback="TM" tone="warning" />
            <Avatar fallback="!" tone="danger" />
            <Avatar fallback="N" tone="neutral" />
          </Stack>
          <Stack direction="row" gap="md" align="center" wrap="wrap">
            <Avatar fallback="S" size="sm" />
            <Avatar fallback="M" size="md" />
            <Avatar fallback="L" size="lg" />
            <Avatar fallback="XL" size="xl" />
            <Avatar fallback="SQ" radius="lg" tone="primary" />
          </Stack>
          <Stack direction="row" gap="sm" align="center">
            <Avatar
              alt="Finn UI profile"
              fallback="FU"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80"
              size="lg"
            />
            <Stack gap="xs">
              <Text variant="label">Finn UI maintainer</Text>
              <Badge tone="success">Online</Badge>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}

function renderWithTheme(theme = lightTheme) {
  return (
    <UIProvider theme={theme}>
      <AvatarDemo />
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
    fallback: "AP",
    tone: "primary"
  }
};
