# Finn UI Library

Finn UI is a theme-first UI library monorepo for building reusable React
components with shared design tokens, a shared theme system, and Storybook
documentation.

The MVP focuses on Web React. React Native, Theme Studio, npm publishing, and
larger component families are deferred until the Web package API is stable.

## Current Scope

- `@finn-ui/tokens`: design token foundation.
- `@finn-ui/theme`: theme creation, light/dark themes, and theme types.
- `@finn-ui/react`: React provider, theme hook, and primitive components.
- `apps/storybook`: documentation and component preview surface.

Implemented MVP components:

- `Box`
- `Text`
- `Stack`
- `Button`
- `Input`
- `Card`
- `Divider`

## Repository Layout

```text
apps/
  storybook/              Storybook app for previews and docs
packages/
  tokens/                 Shared design token package
  theme/                  Theme model and default themes
  react/                  React provider, hook, and components
docs/
  product/                Living product contract
  stories/                Harness story packets
  decisions/              Architecture and process decisions
scripts/
  bin/harness-cli.exe     Harness CLI, ignored locally when installed
```

## Requirements

- Node.js compatible with the installed Storybook/Vite toolchain.
- pnpm `11.7.0` or newer compatible pnpm 11 release.

The workspace uses pnpm and TypeScript. Install dependencies from the repository
root:

```powershell
pnpm install
```

## Common Commands

```powershell
# Type-check all workspaces
pnpm typecheck

# Build all Finn UI packages
pnpm build

# Start Storybook locally
pnpm storybook

# Build static Storybook output
pnpm build:storybook
```

Storybook runs locally at:

```text
http://127.0.0.1:6006/
```

Static Storybook output is generated at:

```text
apps/storybook/storybook-static/
```

## Package Usage

The React package exposes the provider, theme hook, and components:

```tsx
import {
  Button,
  Card,
  Stack,
  Text,
  UIProvider,
} from "@finn-ui/react";
import { lightTheme } from "@finn-ui/theme";

export function App() {
  return (
    <UIProvider theme={lightTheme}>
      <Card>
        <Stack gap="md">
          <Text as="h1" size="xl" weight="bold">
            Finn UI
          </Text>
          <Button>Get started</Button>
        </Stack>
      </Card>
    </UIProvider>
  );
}
```

The public API is still pre-release and may change while the MVP stories are
being completed.

## Storybook Deployment

For manual deployment, build Storybook first:

```powershell
pnpm build:storybook
```

Then deploy the generated static directory with the provider of your choice:

```text
apps/storybook/storybook-static/
```

When connecting Vercel through Git, use:

- Build command: `pnpm build:storybook`
- Output directory: `apps/storybook/storybook-static`
- Install command: `pnpm install`

## Harness Workflow

This repository uses Harness as the project operating layer for agent-assisted
development. Before implementation work, read:

- `AGENTS.md`
- `SPEC.md`
- `docs/HARNESS.md`
- `docs/FEATURE_INTAKE.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTEXT_RULES.md`
- `docs/TOOL_REGISTRY.md`
- `docs/TEST_MATRIX.md`

On Windows, use the Harness CLI from the repository root:

```powershell
.\scripts\bin\harness-cli.exe query matrix
```

Story packets live under `docs/stories/`, and durable decisions live under
`docs/decisions/`.

## Validation Baseline

Before handing off component or documentation changes, run:

```powershell
pnpm typecheck
pnpm build
pnpm build:storybook
```

For UI changes, also open Storybook locally and check the affected stories in
both light and dark themes where relevant.
