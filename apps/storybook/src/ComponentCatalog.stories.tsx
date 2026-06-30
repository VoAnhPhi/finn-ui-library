import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, Badge, Box, Button, Card, Checkbox, Divider, FormField, Input, Skeleton, Stack, Switch, Text, UIProvider } from "@finn-ui/react";
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
                <Avatar fallback="FU" tone="primary" />
                <Badge tone="success">Ready</Badge>
                <Badge variant="outline" tone="warning">Beta</Badge>
              </Stack>
              <Stack gap="sm">
                <Skeleton width="60%" height={16} />
                <Skeleton width="42%" height={16} />
              </Stack>
              <Divider />
              <Text variant="title">Forms and surfaces</Text>
              <Stack gap="md">
                <FormField id="catalog-email" label="Email" helperText="Connected label and helper text.">
                  <Input placeholder="Email" />
                </FormField>
                <FormField id="catalog-error" label="Required field" error="This field is required.">
                  <Input placeholder="With error" />
                </FormField>
                <Stack direction="row" gap="lg" wrap="wrap">
                  <Checkbox defaultChecked label="Checkbox" />
                  <Switch defaultChecked label="Switch" />
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </UIProvider>
  )
};
