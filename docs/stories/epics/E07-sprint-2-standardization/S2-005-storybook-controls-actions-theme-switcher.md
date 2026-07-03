# S2-005 Storybook Controls Actions Theme Switcher

## Status

implemented

## Lane

high-risk

## Product Contract

Storybook should use a global Finn UI theme decorator and toolbar switcher so
component stories can exercise light, dark, and custom themes without local
provider duplication. Core stories should expose useful controls and action
wiring while preserving existing recipe and theme coverage.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `docs/stories/epics/E07-sprint-2-standardization/overview.md`
- `docs/UIUX_WORKFLOW_LOG.md`
- `docs/NEXT_TASK_WORKFLOW.md`

## Acceptance Criteria

- Storybook preview defines a global `UIProvider` decorator.
- Storybook preview defines a `finnTheme` toolbar global with light, dark, and
  custom theme choices.
- Stories can override the active theme through `parameters.finnTheme`.
- Controls are expanded by default and key Button props expose explicit control
  options.
- Actions are wired for event-style props such as `onClick`.
- Existing component stories continue to render light, dark, custom, and recipe
  coverage after removing local provider duplication.
- UI/UX workflow notes are extended for later Sprint 2 work.

## Design Notes

- Commands: no new package commands.
- Queries: no data queries.
- API: no package public API changes.
- Tables: no data model changes.
- Domain rules: Storybook theme switching is documentation and QA behavior, not
  a runtime package feature.
- UI surfaces: Storybook toolbar, component stories, foundation theme stories.

## UI/UX Workflow Notes For Later Stories

- Treat Storybook globals as the fastest visual QA path for theme regressions.
- Keep story controls focused on meaningful product states instead of exposing
  every implementation detail.
- Prefer story-level `parameters.finnTheme` when a story must prove a specific
  theme; prefer the toolbar global when manually exploring.
- Keep action wiring visible for interactive components so future keyboard,
  focus, disabled, and loading checks can be tested from Storybook.
- S2-006 should reuse this theme-switching setup to compare demo behavior
  against component-level Storybook behavior.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id S2-005 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` |
| Integration | `pnpm build` and `pnpm build:storybook` |
| E2E | Browser QA recommended before closing broader Sprint 2. |
| Platform | Storybook local QA verifies global decorator and theme switching. |
| Release | Not required for this slice. |

## Research Notes

- Storybook toolbar globals are the supported path for globally switching story
  context such as theme values.
- Storybook decorators are the supported path for wrapping all stories in a
  common provider.
- Storybook controls and actions are the appropriate interaction layer for
  component prop exploration and event visibility.

## Evidence

- `pnpm --filter storybook typecheck` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- `pnpm build:storybook` passed with the known Vite chunk-size warning.
- `scripts/bin/harness-cli story verify S2-005` passed.
- Browser QA at `http://127.0.0.1:6011/iframe.html?id=foundation-theme-system--toolbar-theme&viewMode=story`
  verified the global decorator defaulted to `data-finn-theme="light"`.
- Browser QA at `http://127.0.0.1:6011/iframe.html?id=foundation-theme-system--toolbar-theme&viewMode=story&globals=finnTheme:dark`
  verified the toolbar global changed the provider to
  `data-finn-theme="dark"` and updated CSS variables.
- Browser QA at `http://127.0.0.1:6011/iframe.html?id=components-button--custom&viewMode=story`
  verified story-level custom theme override.
- Browser QA at `http://127.0.0.1:6011/iframe.html?id=components-primitives--recipes&viewMode=story&globals=finnTheme:custom`
  verified recipe stories still render under the custom theme.
