# P4-001 Storybook Docs And Theme Catalog

## Status

implemented

## Lane

normal

## Product Contract

Phase 4 makes Storybook useful as the MVP preview and documentation surface.
The component docs should explain the Finn UI theme-first contract, show the
MVP component catalog, compare light/dark/custom themes, and remain deployable
as static Storybook output.

This story does not deploy Storybook to a hosted provider. It prepares the
static build and records deploy settings.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- Storybook has an introduction docs page describing the MVP packages,
  component set, customization model, and deploy output.
- Storybook includes a theme comparison story for light, dark, and custom
  themes.
- Storybook includes a component catalog story showing all MVP components.
- Existing component stories still build.
- `pnpm typecheck`, `pnpm build`, and `pnpm build:storybook` pass.
- Storybook dev server returns HTTP 200.
- Durable Harness matrix and story evidence are updated.

## Design Notes

- Commands: `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: Storybook docs/stories only.
- Tables: none.
- Domain rules: Storybook is the MVP docs and preview surface; hosted deploy is
  a follow-up story.
- UI surfaces: Storybook docs, theme comparison, component catalog.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P4-001 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates stories and docs imports. |
| Integration | `pnpm build` validates package build and workspace boundaries. |
| E2E | Not required; hosted deploy is out of scope. |
| Platform | `pnpm build:storybook` and HTTP 200 validate Storybook output. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the first Phase 4 documentation story and proof expectations for
Storybook static output.

## Evidence

- `pnpm typecheck` passed for packages and Storybook.
- `pnpm build` passed for `@finn-ui/tokens`, `@finn-ui/theme`, and
  `@finn-ui/react`.
- `pnpm build:storybook` completed successfully and wrote
  `apps/storybook/storybook-static`.
- Existing Storybook dev server at `http://127.0.0.1:6006/` returned HTTP 200.
- Storybook build reported the default large chunk warning, but no build
  failure.
