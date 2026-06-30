# P6-002 FormField

## Status

implemented

## Lane

normal

## Product Contract

Phase 6 continues the Web React component expansion with `FormField`, a
theme-aware wrapper for form controls. It provides accessible label, helper,
required, and error copy wiring while leaving the control implementation to
`Input` or future form components.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `@finn-ui/react` exports `FormField` and `FormFieldProps`.
- `FormField` supports `label`, `helperText`, `error`, `required`, and `id`.
- `FormField` connects label and helper/error copy to its child control.
- `Input` reflects `aria-invalid` styling when used inside `FormField`.
- Storybook includes FormField stories for light, dark, custom, and playground
  usage.
- The playground consumes `FormField` from `@finn-ui/react`.
- `pnpm release:check` passes.
- Durable Harness matrix and story evidence are updated.

## Design Notes

- Commands: `pnpm release:check`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: `FormField`, `FormFieldProps`.
- Tables: none.
- Domain rules: FormField owns copy and accessibility wiring, not control state.
- UI surfaces: `apps/storybook`, `apps/playground-web`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P6-002 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates FormField props and stories. |
| Integration | `pnpm check:packages` validates FormField package exports. |
| E2E | Not required; no browser workflow is introduced. |
| Platform | `pnpm release:check` validates package, playground, and Storybook builds. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the second Phase 6 Web component expansion story.

## Evidence

- `pnpm release:check` passed.
- Browser QA for Storybook `components-formfield--light` passed with label,
  helper, error, `aria-describedby`, `aria-invalid`, and no console errors.
