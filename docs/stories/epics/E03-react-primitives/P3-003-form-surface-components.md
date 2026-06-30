# P3-003 Form Surface Components

## Status

implemented

## Lane

normal

## Product Contract

Phase 3 completes the Web component MVP set by implementing `Input`, `Card`,
and `Divider` for `@finn-ui/react`. These components should resolve theme
values through `UIProvider` and follow the same theme-first customization model
as the primitives and Button.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `@finn-ui/react` exports `Input`, `Card`, `Divider`, and their prop types.
- `Input` supports value/defaultValue, placeholder, disabled, readOnly, error,
  size, radius, leftIcon, rightIcon, native input props, `style`, and
  `className`.
- `Card` supports variant, padding, radius, background, border width, border
  color, shadow, native element props, `style`, and `className`.
- `Divider` supports orientation, size, color, spacing, native element props,
  and `style`.
- Components resolve theme values from `UIProvider`.
- Storybook includes light, dark, and custom theme stories covering the form
  and surface components.
- `pnpm typecheck`, `pnpm build`, and `pnpm build:storybook` pass.

## Design Notes

- Commands: `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: `Input`, `Card`, `Divider`.
- Tables: none.
- Domain rules: theme is primary customization; props are secondary;
  `style`/`className` are escape hatches.
- UI surfaces: Storybook form/surface preview.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P3-003 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates component prop types and exports. |
| Integration | `pnpm build` validates package build and workspace boundaries. |
| E2E | Not required; no production workflow exists yet. |
| Platform | `pnpm build:storybook` validates static Storybook generation. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the final Phase 3 MVP component story and proof expectations for form and
surface components.

## Evidence

- `pnpm typecheck` passed for packages and Storybook.
- `pnpm build` passed for `@finn-ui/tokens`, `@finn-ui/theme`, and
  `@finn-ui/react`.
- `pnpm build:storybook` completed successfully and wrote
  `apps/storybook/storybook-static`.
- Existing Storybook dev server at `http://127.0.0.1:6006/` returned HTTP 200.
- Storybook build reported the default large chunk warning, but no build
  failure.
