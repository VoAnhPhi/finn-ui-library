# S2-003 Button/Input/Card Recipes

## Status

implemented

## Lane

high-risk

## Product Contract

Button, Input, and Card should use repeatable recipe styling instead of keeping
their core visual behavior inside large inline style objects. Recipes should be
driven by stable `data-*` attributes and inherited `--finn-*` CSS variables
while preserving existing public props and escape hatches.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `docs/stories/epics/E07-sprint-2-standardization/overview.md`
- `docs/UIUX_WORKFLOW_LOG.md`

## Research Notes

- Material Design 3 treats enabled, hovered, focused, pressed, and disabled as
  explicit component states across buttons, cards, and text fields:
  https://m3.material.io/foundations/interaction/states/applying-states
- Material Design 3 text fields distinguish enabled, focused, hovered, and
  disabled visual states, which maps well to an Input control wrapper:
  https://m3.material.io/components/text-fields
- Fluent 2 treats Field as the reusable wrapper for controls that ask someone
  to enter information, which supports keeping label/helper/error concerns in
  `FormField` and control states in `Input`:
  https://fluent2.microsoft.design/components/web/react/core/field/usage
- WCAG 2.2 recommends adopting WCAG 2.2 as a conformance target and defines
  target-size and focus-appearance guidance relevant to component recipes:
  https://www.w3.org/TR/WCAG22/
- WCAG 2.2 target size minimum requires pointer targets to be at least 24 by 24
  CSS pixels unless an exception applies:
  https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

## Acceptance Criteria

- `UIProvider` injects shared Finn UI recipe CSS into the provider scope.
- `Button` uses `data-finn-ui-button`, `data-variant`, `data-tone`, `data-size`,
  and state attributes for recipe styling.
- `Input` uses a root, control, input, icon, and error recipe structure so
  focus, invalid, disabled, and read-only states are styleable without changing
  the public API.
- `Card` uses recipe variables for background, color, border, radius, shadow,
  and padding while preserving existing props.
- Existing component imports and public prop names remain unchanged.
- Storybook includes recipe/state coverage for Button, Input, and Card.

## Design Notes

- Commands: no new package commands.
- Queries: no data queries.
- API: no public API changes.
- Tables: no data model changes.
- Domain rules: component recipes remain scoped under `UIProvider` and use
  `--finn-*` variables.
- UI surfaces: Storybook Button and Form Surface stories.

## UI/UX Workflow Notes For Later Stories

- Keep `FormField` responsible for label/helper/error copy and `Input`
  responsible for control state rendering.
- Use data attributes for component variant/state selectors before adding new
  component-specific prop APIs.
- Maintain at least 32px small controls and 40px default controls so recipes
  exceed WCAG 2.2 minimum target-size guidance.
- Focus indicators must remain visible against light, dark, and custom themes.
- Cards should communicate hierarchy through fill, border softness, and shadow,
  not heavy borders everywhere.
- Continue this log in `docs/UIUX_WORKFLOW_LOG.md` when S2-004 and later stories
  standardize more primitives.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id S2-003 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` |
| Integration | `pnpm build` and `pnpm build:storybook` |
| E2E | Browser QA recommended before closing broader Sprint 2. |
| Platform | Storybook build includes Button Recipes and Form Surface Recipes stories. |
| Release | Not required for this slice. |

## Harness Delta

No harness rule changes expected.

## Evidence

- `pnpm --filter @finn-ui/react typecheck` passed during implementation.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- `pnpm build:storybook` passed with the known Vite chunk-size warning.
- `scripts/bin/harness-cli story verify S2-003` passed.
- Browser QA at `http://127.0.0.1:6008/iframe.html?id=components-button--recipes&viewMode=story`
  verified Button recipe data attributes, 40px default target height,
  themed background, and visible 2px focus outline.
- Browser QA at `http://127.0.0.1:6008/iframe.html?id=components-form-surface--recipes&viewMode=story`
  verified Input invalid state, 40px target height, recipe markers, and
  elevated Card recipe padding/shadow.
