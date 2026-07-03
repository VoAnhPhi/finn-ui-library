# UI/UX Workflow Log

Use this log to carry design-system research and UI/UX cautions across Sprint 2
stories. Keep entries short, source-backed where useful, and tied to upcoming
workflow decisions.

## 2026-07-04 - S2-003 Button/Input/Card Recipes

### Sources Reviewed

- Material Design 3 states:
  https://m3.material.io/foundations/interaction/states/applying-states
- Material Design 3 buttons:
  https://m3.material.io/components/buttons/specs
- Material Design 3 text fields:
  https://m3.material.io/components/text-fields
- Fluent 2 Field usage:
  https://fluent2.microsoft.design/components/web/react/core/field/usage
- WCAG 2.2:
  https://www.w3.org/TR/WCAG22/
- WCAG 2.2 target size minimum:
  https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WCAG focus appearance understanding:
  https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html

### Decisions For S2-003

- Use `data-*` attributes as the stable selector contract for recipe styling.
- Keep inherited `--finn-*` variables as the visual token source.
- Scope default recipe CSS through `UIProvider` so consumers do not need a
  separate CSS import yet.
- Preserve existing public props and treat `style` and `className` as escape
  hatches.

### Carry Forward

- S2-004 Primitive standardization should reuse the same data-attribute and CSS
  variable approach for Box, Text, Stack, and Divider where state or variant
  styling exists.
- S2-005 Storybook controls should expose recipe state coverage, not only happy
  paths.
- S2-006 Demo should prove focus, target size, loading, disabled, and invalid
  states in a realistic page flow.
- Before adding new component props, check whether a data attribute or existing
  semantic token is enough.
- Keep default interactive targets at 40px when practical; 32px small controls
  remain above the WCAG 2.2 24px minimum and should not be packed tightly.

## 2026-07-04 - S2-004 Primitive Standardization

### Decisions For S2-004

- Reuse the S2-003 recipe model for primitives rather than creating a second
  styling architecture.
- Give each primitive a stable DOM marker: `data-finn-ui-box`,
  `data-finn-ui-text`, `data-finn-ui-stack`, and `data-finn-ui-divider`.
- Keep Box, Text, Stack, and Divider focused on composition, hierarchy, layout,
  and separation. Do not add new visual variants unless a later story selects
  them explicitly.

### Carry Forward

- S2-005 Storybook controls should expose these primitive recipe attributes in
  current stories and use controls to exercise spacing, text variants, and
  divider orientation.
- S2-006 Demo should use primitives as the first layer of composition before
  reaching for custom CSS.
- When adding responsive primitive behavior later, prefer explicit props or a
  documented responsive token model instead of ad hoc object props.

## 2026-07-04 - S2-005 Storybook Controls Actions Theme Switcher

### Sources Reviewed

- Storybook toolbar globals:
  https://storybook.js.org/docs/essentials/toolbars-and-globals
- Storybook decorators:
  https://storybook.js.org/docs/writing-stories/decorators
- Storybook controls:
  https://storybook.js.org/docs/essentials/controls
- Storybook actions:
  https://storybook.js.org/docs/essentials/actions

### Decisions For S2-005

- Use one global Storybook `UIProvider` decorator instead of repeating providers
  inside component stories.
- Add a `finnTheme` toolbar global with light, dark, and custom choices.
- Keep story-level `parameters.finnTheme` for stories that need deterministic
  theme proof in build and browser QA.
- Use explicit Button controls for size, tone, and variant because these are the
  highest-signal recipe axes for manual QA.
- Keep action wiring for event-like props so interactive stories reveal clicks
  and future input events in the Storybook actions panel.

### Carry Forward

- S2-006 Demo should use the same light, dark, and custom theme expectations as
  Storybook so visual regressions can be compared quickly.
- When a new component story is added, rely on the global decorator first and
  only add a local provider when the story demonstrates provider behavior.
- Continue adding controls only for meaningful state or product choices; avoid
  turning Storybook into an implementation prop dump.
