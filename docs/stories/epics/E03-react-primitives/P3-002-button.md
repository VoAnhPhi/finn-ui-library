# P3-002 Button

## Status

implemented

## Lane

normal

## Product Contract

Phase 3 continues the Web component MVP by implementing `Button` for
`@finn-ui/react`. Button should follow the Finn UI convention of `variant`,
`tone`, and `size`, resolve theme component defaults, and expose direct style
override as an escape hatch.

This story does not implement `Input`, `Card`, or `Divider`.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `@finn-ui/react` exports `Button` and its prop types.
- `Button` supports `variant`, `tone`, `size`, `radius`, `fullWidth`,
  `disabled`, `loading`, `leftIcon`, `rightIcon`, `style`, `className`, native
  button props, and children.
- Supported variants are `solid`, `outline`, `ghost`, `soft`, and `link`.
- Supported tones are `primary`, `neutral`, `danger`, `success`, and `warning`.
- Supported sizes are `sm`, `md`, and `lg`.
- Button resolves theme values from `UIProvider`, including component defaults
  for radius and border width.
- Storybook includes light, dark, and custom theme Button stories.
- `pnpm typecheck`, `pnpm build`, and `pnpm build:storybook` pass.

## Design Notes

- Commands: `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: `Button`.
- Tables: none.
- Domain rules: theme is primary customization; props are secondary;
  `style`/`className` are escape hatches.
- UI surfaces: Storybook Button preview.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P3-002 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates Button prop types and exports. |
| Integration | `pnpm build` validates package build and workspace boundaries. |
| E2E | Not required; no production workflow exists yet. |
| Platform | `pnpm build:storybook` validates static Storybook generation. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the second Phase 3 implementation story and proof expectations for the
first action component.

## Evidence

- `pnpm typecheck` passed for packages and Storybook.
- `pnpm build` passed for `@finn-ui/tokens`, `@finn-ui/theme`, and
  `@finn-ui/react`.
- `pnpm build:storybook` completed successfully and wrote
  `apps/storybook/storybook-static`.
- Existing Storybook dev server at `http://127.0.0.1:6006/` returned HTTP 200.
- Storybook build reported the default large chunk warning, but no build
  failure.
