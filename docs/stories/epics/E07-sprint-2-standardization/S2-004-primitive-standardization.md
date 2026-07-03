# S2-004 Primitive Standardization

## Status

implemented

## Lane

high-risk

## Product Contract

Box, Text, Stack, and Divider should follow the same recipe direction as
Button, Input, and Card: stable `data-*` attributes, inherited `--finn-*` CSS
variables, theme-aware props, and preserved public APIs.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `docs/stories/epics/E07-sprint-2-standardization/overview.md`
- `docs/UIUX_WORKFLOW_LOG.md`

## Acceptance Criteria

- `Box` exposes `data-finn-ui-box` and maps spacing/surface props to recipe CSS
  variables.
- `Text` exposes `data-finn-ui-text`, `data-variant`, and `data-tone` while
  using recipe variables for typography and color.
- `Stack` exposes `data-finn-ui-stack` and `data-direction` while using recipe
  variables for flex layout.
- `Divider` exposes `data-finn-ui-divider` and `data-orientation` while keeping
  semantic separator attributes.
- Existing imports and public prop names remain unchanged.
- Storybook includes recipe coverage for Box, Text, Stack, and Divider.
- UI/UX workflow notes are extended for later Sprint 2 work.

## Design Notes

- Commands: no new package commands.
- Queries: no data queries.
- API: no public API changes.
- Tables: no data model changes.
- Domain rules: primitive recipes remain scoped under `UIProvider`.
- UI surfaces: Storybook Primitives Recipes story.

## UI/UX Workflow Notes For Later Stories

- Treat primitives as layout and semantic foundations, not decorative widgets.
- Keep `Box` for surface and spacing composition; avoid turning it into a large
  component API with one-off visual props.
- Keep `Text` variants tied to semantic hierarchy and readable line height.
- Keep `Stack` predictable for repeated composition; future responsive behavior
  should be additive and explicit.
- Keep `Divider` subtle by default. It should separate content without becoming
  a heavy visual border system.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id S2-004 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` |
| Integration | `pnpm build` and `pnpm build:storybook` |
| E2E | Browser QA recommended before closing broader Sprint 2. |
| Platform | Storybook build includes Primitives Recipes story. |
| Release | Not required for this slice. |

## Harness Delta

Add the end-of-task next task recommendation workflow to
`docs/NEXT_TASK_WORKFLOW.md` and the local `AGENTS.md` shortcut instructions.

## Evidence

- `pnpm --filter @finn-ui/react typecheck` passed during implementation.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- `pnpm build:storybook` passed with the known Vite chunk-size warning.
- `scripts/bin/harness-cli story verify S2-004` passed.
- Browser QA at `http://127.0.0.1:6010/iframe.html?id=components-primitives--recipes&viewMode=story`
  verified Box, Text, Stack, and Divider recipe data attributes and computed
  styles. The QA pass caught and fixed a Box padding cascade issue before
  closure.
