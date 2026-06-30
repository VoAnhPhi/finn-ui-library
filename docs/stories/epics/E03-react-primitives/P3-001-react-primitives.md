# P3-001 React Primitives

## Status

implemented

## Lane

normal

## Product Contract

Phase 3 starts the Web component MVP by implementing the foundational React
primitives: `Box`, `Text`, and `Stack`. These components should consume the
active Finn UI theme through `useTheme` and expose the theme-first customization
model defined in the product overview.

This story does not implement `Button`, `Input`, `Card`, or `Divider`.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `@finn-ui/react` exports `Box`, `Text`, and `Stack` plus their prop types.
- `Box` supports `as`, spacing props, surface props, `style`, `className`, and
  children.
- `Text` supports variant, tone/color, alignment, weight, size, `style`,
  `className`, and children.
- `Stack` supports direction, gap, align, justify, wrap, `style`, `className`,
  and children.
- Components resolve token and semantic theme values from `UIProvider`.
- Storybook includes light, dark, and custom theme stories for the primitives.
- `pnpm typecheck`, `pnpm build`, and `pnpm build:storybook` pass.

## Design Notes

- Commands: `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: `Box`, `Text`, `Stack`.
- Tables: none.
- Domain rules: theme is primary customization; direct style is an escape hatch.
- UI surfaces: Storybook primitive preview.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P3-001 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates component prop types and exports. |
| Integration | `pnpm build` validates package build and workspace boundaries. |
| E2E | Not required; no production workflow exists yet. |
| Platform | `pnpm build:storybook` validates static Storybook generation. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the first Phase 3 implementation story and proof expectations for React
component primitives.

## Evidence

- `pnpm typecheck` passed for packages and Storybook.
- `pnpm build` passed for `@finn-ui/tokens`, `@finn-ui/theme`, and
  `@finn-ui/react`.
- `pnpm build:storybook` completed successfully and wrote
  `apps/storybook/storybook-static`.
- Existing Storybook dev server at `http://127.0.0.1:6006/` returned HTTP 200.
- Storybook build reported the default large chunk warning, but no build
  failure.
