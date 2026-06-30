# @finn-ui/react

React Web components for Finn UI.

## Status

This package is private and pre-release. The API may change while the MVP is
being stabilized.

## Peer Dependencies

- React `>=18`

## Usage

```tsx
import { Avatar, Badge, Button, Card, Checkbox, FormField, Input, Skeleton, Stack, Switch, Text, UIProvider } from "@finn-ui/react";
import { lightTheme } from "@finn-ui/theme";

export function App() {
  return (
    <UIProvider theme={lightTheme}>
      <Card>
        <Stack gap="md">
          <Text as="h1" variant="heading">
            Finn UI
          </Text>
          <Badge tone="success">Ready</Badge>
          <Avatar fallback="FU" tone="primary" />
          <FormField label="Email" helperText="Connected label and helper text.">
            <Input placeholder="hello@finn-ui.dev" />
          </FormField>
          <Checkbox label="Accept terms" />
          <Switch label="Enable updates" />
          <Skeleton height={16} width="60%" />
          <Button>Get started</Button>
        </Stack>
      </Card>
    </UIProvider>
  );
}
```

## Components

- `Box`
- `Text`
- `Stack`
- `Button`
- `Badge`
- `Avatar`
- `Checkbox`
- `Switch`
- `Skeleton`
- `Input`
- `FormField`
- `Card`
- `Divider`

## Build

```powershell
pnpm --filter @finn-ui/react build
```
