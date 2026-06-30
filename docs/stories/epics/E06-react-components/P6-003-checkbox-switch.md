# P6-003 Checkbox And Switch

## Status

implemented

## Lane

normal

## Product Contract

Phase 6 continues the Web React component expansion with `Checkbox` and
`Switch`, binary controls for agreements and settings. Both components use
native checkbox inputs, support controlled and uncontrolled usage, and expose a
convenience `onCheckedChange` callback while staying theme-aware.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `@finn-ui/react` exports `Checkbox`, `Switch`, and their prop types.
- `Checkbox` supports `checked`, `defaultChecked`, `disabled`,
  `onCheckedChange`, `size`, `tone`, and `label`.
- `Switch` supports `checked`, `defaultChecked`, `disabled`,
  `onCheckedChange`, `size`, `tone`, and `label`.
- Both controls use native checkbox inputs for keyboard and form behavior.
- Storybook includes selection-control stories for light, dark, custom, tones,
  sizes, disabled, and checked states.
- The playground consumes `Checkbox` and `Switch` from `@finn-ui/react`.
- `pnpm release:check` passes.
- Durable Harness matrix and story evidence are updated.

## Design Notes

- Commands: `pnpm release:check`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: `Checkbox`, `CheckboxProps`, `CheckboxTone`, `CheckboxSize`, `Switch`,
  `SwitchProps`, `SwitchTone`, `SwitchSize`.
- Tables: none.
- Domain rules: components own binary control visuals and event plumbing, not
  preference persistence.
- UI surfaces: `apps/storybook`, `apps/playground-web`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P6-003 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates selection control props and stories. |
| Integration | `pnpm check:packages` validates package exports. |
| E2E | Not required; no persisted user workflow is introduced. |
| Platform | `pnpm release:check` validates package, playground, and Storybook builds. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the third Phase 6 Web component expansion story.

## Evidence

- `pnpm release:check` passed.
- Browser QA for Storybook `components-selection-controls--light` passed with
  checkbox, switch, native checked state, role switch, and no console errors.
