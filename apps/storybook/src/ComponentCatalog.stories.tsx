import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button, Card, Divider, Input, Stack, Text, UIProvider } from "@finn-ui/react";
import { lightTheme } from "@finn-ui/theme";

const meta = {
  title: "Docs/Component Catalog",
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const MvpCatalog: Story = {
  render: () => (
    <UIProvider theme={lightTheme}>
      <Box bg="background" color="foreground" p="xl" style={{ width: 760, maxWidth: "100%" }}>
        <Stack gap="xl">
          <Stack gap="xs">
            <Text variant="heading">Finn UI MVP catalog</Text>
            <Text color="muted">The first Web component set exported from `@finn-ui/react`.</Text>
          </Stack>
          <Card variant="outline" p="xl">
            <Stack gap="lg">
              <Text variant="title">Layout and typography</Text>
              <Stack direction="row" gap="md" wrap="wrap">
                <Box bg="card" p="lg" radius="lg" borderWidth="thin" borderColor="border">
                  <Text variant="label">Box</Text>
                </Box>
                <Box bg="card" p="lg" radius="lg" borderWidth="thin" borderColor="border">
                  <Text variant="label">Text</Text>
                </Box>
                <Box bg="card" p="lg" radius="lg" borderWidth="thin" borderColor="border">
                  <Text variant="label">Stack</Text>
                </Box>
              </Stack>
              <Divider />
              <Text variant="title">Actions</Text>
              <Stack direction="row" gap="md" wrap="wrap">
                <Button>Solid button</Button>
                <Button variant="outline">Outline button</Button>
                <Button variant="soft" tone="danger">Soft danger</Button>
              </Stack>
              <Divider />
              <Text variant="title">Forms and surfaces</Text>
              <Stack gap="md">
                <Input placeholder="Email" />
                <Input placeholder="With error" error="This field is required" />
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </UIProvider>
  )
};
