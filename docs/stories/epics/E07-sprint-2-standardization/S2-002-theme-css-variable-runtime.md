# S2-002 Theme CSS Variable Runtime

## Status

implemented

## Lane

high-risk

## Product Contract

Finn UI themes should work as runtime styling contracts, not only React context
objects. `UIProvider` should expose theme values as inherited `--finn-*` CSS
variables so components, stories, and consumer apps can switch themes without
rewriting every visual value inline.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `docs/stories/epics/E07-sprint-2-standardization/overview.md`

## Acceptance Criteria

- `@finn-ui/theme` exports a helper that converts a `Theme` into stable
  `--finn-*` CSS variables.
- `UIProvider` injects CSS variables on a provider DOM scope while preserving
  React context behavior.
- Core components can consume theme colors, radius, spacing, border width, and
  typography through CSS variable fallbacks.
- Heavy default borders are reduced so solid/elevated surfaces rely on fill and
  shadow, while outline/input/selection controls use softer border colors.
- Storybook includes a theme foundation story proving runtime variables.

## Design Notes

- Commands: no new package commands.
- Queries: no data queries.
- API: additive export `createThemeCssVariables`; additive provider DOM props.
- Tables: no data model changes.
- Domain rules: CSS variables are prefixed with `--finn-`.
- UI surfaces: Storybook theme foundation and existing component stories.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id S2-002 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` |
| Integration | `pnpm build` and `pnpm build:storybook` |
| E2E | Browser QA recommended before closing broader Sprint 2. |
| Platform | Storybook build includes `CssVariableRuntime`. |
| Release | Not required for this slice. |

## Harness Delta

No harness rule changes expected.

## Evidence

- `pnpm typecheck` passed.
- `pnpm build` passed.
- `pnpm build:storybook` passed with the known Vite chunk-size warning.
- `pnpm build:playground` passed.
- Browser QA at `http://localhost:6007/iframe.html?id=foundation-theme-system--css-variable-runtime&viewMode=story`
  verified `UIProvider` exposes `--finn-*` variables for the custom theme.
- Browser QA at `http://localhost:6007/iframe.html?id=components-form-surface--custom&viewMode=story`
  verified softer Card/Input/Button border rendering.
- Browser QA at `http://localhost:6007/iframe.html?id=components-selection-controls--custom&viewMode=story`
  verified selection controls render with improved field spacing.
- Component story surfaces were rechecked after removing wrapper borders and
  adding native padding wrappers for Button, Form Surface, and Selection
  Controls.
