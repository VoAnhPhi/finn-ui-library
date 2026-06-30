# P2-001 Tokens Theme And Provider

## Status

implemented

## Lane

normal

## Product Contract

Phase 2 implements the shared token and theme foundation for Finn UI. Consumers
should be able to import design tokens, create a theme, use built-in light/dark
themes, and provide a theme to React components through `UIProvider` and
`useTheme`.

This phase does not implement MVP components such as `Button`, `Box`, `Text`,
`Input`, `Card`, `Stack`, or `Divider`. Phase 3 owns those components.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `@finn-ui/tokens` exports base token groups for colors, spacing, radius,
  typography, shadow, border width, opacity, z-index, duration, and easing.
- `@finn-ui/theme` exports `createTheme`, `lightTheme`, `darkTheme`, and theme
  types.
- Theme objects include shared tokens, semantic colors, and component-level
  defaults for `Button`, `Input`, and `Card`.
- `@finn-ui/react` exports `UIProvider`, `useTheme`, and the `Theme` type.
- Storybook includes Phase 2 stories previewing light, dark, and custom themes.
- `pnpm build`, `pnpm typecheck`, and `pnpm build:storybook` pass.

## Design Notes

- Commands: `pnpm build`, `pnpm typecheck`, `pnpm build:storybook`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: `tokens`, `createTheme`, `lightTheme`, `darkTheme`, `UIProvider`,
  `useTheme`.
- Tables: none.
- Domain rules: theme is the primary customization layer; props and direct
  style overrides come later with components.
- UI surfaces: Storybook foundation theme preview.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P2-001 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates exported types and package source. |
| Integration | `pnpm build` validates package build and dependency boundaries. |
| E2E | Not required; no production user flow exists yet. |
| Platform | `pnpm build:storybook` validates static Storybook generation. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the Phase 2 implementation story and records proof expectations for the
first real Finn UI package APIs.

## Evidence

- `pnpm typecheck` passed from a clean state without package `dist` output.
- `pnpm build` passed for `@finn-ui/tokens`, `@finn-ui/theme`, and
  `@finn-ui/react`.
- `pnpm build:storybook` completed successfully and wrote
  `apps/storybook/storybook-static`.
- Existing Storybook dev server at `http://127.0.0.1:6006/` returned HTTP 200.
- Storybook build reported the default large chunk warning, but no build
  failure.
