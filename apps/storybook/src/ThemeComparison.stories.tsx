import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Card, Divider, Input, Stack, Text, UIProvider } from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";
import type { Theme } from "@finn-ui/react";

const customTheme = createTheme({
  name: "custom violet",
  colors: {
    primary: "#7C3AED",
    primaryForeground: "#FFFFFF",
    danger: "#E11D48",
    success: "#059669",
    card: "#F5F3FF",
    border: "#DDD6FE",
    muted: "#6D28D9"
  },
  components: {
    Button: {
      radius: "xl"
    },
    Input: {
      radius: "lg"
    },
    Card: {
      radius: "xl",
      shadow: "md"
    }
  }
});

const themes = [lightTheme, darkTheme, customTheme];

const meta = {
  title: "Themes/Comparison",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function ThemeSwatch({ theme }: { theme: Theme }) {
  return (
    <UIProvider theme={theme}>
      <Box bg="background" color="foreground" p="xl" style={{ minHeight: "100%" }}>
        <Card variant="elevated" p="xl">
          <Stack gap="lg">
            <Stack gap="xs">
              <Text variant="caption" color="muted">
                {theme.name}
              </Text>
              <Text variant="title">Theme comparison</Text>
              <Text color="muted">The same component tree rendered through one theme object.</Text>
            </Stack>
            <Divider />
            <Stack direction="row" gap="sm" wrap="wrap">
              <Button tone="primary">Primary</Button>
              <Button tone="danger" variant="outline">Danger</Button>
              <Button tone="success" variant="soft">Success</Button>
            </Stack>
            <Input placeholder="Email" defaultValue="hello@finn-ui.dev" />
            <Stack direction="row" gap="sm" wrap="wrap">
              <Box bg="primary" color="primaryForeground" p="md" radius="md">primary</Box>
              <Box bg="card" color="cardForeground" p="md" radius="md" borderWidth="thin" borderColor="border">card</Box>
              <Box bg="danger" color="dangerForeground" p="md" radius="md">danger</Box>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </UIProvider>
  );
}

export const SideBySide: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        minHeight: "100vh"
      }}
    >
      {themes.map((theme) => (
        <ThemeSwatch key={theme.name} theme={theme} />
      ))}
    </div>
  )
};
