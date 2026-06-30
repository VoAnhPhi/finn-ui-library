import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Stack, Text, UIProvider } from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme } from "@finn-ui/theme";

const customTheme = createTheme({
  name: "button custom",
  colors: {
    primary: "#7C3AED",
    primaryForeground: "#FFFFFF",
    danger: "#E11D48",
    card: "#F5F3FF",
    border: "#DDD6FE"
  },
  components: {
    Button: {
      radius: "xl",
      borderWidth: "thin"
    }
  }
});

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
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
    <Box bg="background" color="foreground" p="xl" radius="xl" borderWidth="thin" borderColor="border">
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
    </Box>
  );
}

function renderWithTheme(theme = lightTheme) {
  return (
    <UIProvider theme={theme}>
      <ButtonGrid />
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
    children: "Save changes",
    tone: "primary",
    variant: "solid",
    size: "md"
  }
};
