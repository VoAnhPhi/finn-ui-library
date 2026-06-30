# P6-001 Badge

## Status

implemented

## Lane

normal

## Product Contract

Phase 6 expands the Web React component set beyond the MVP foundation. `Badge`
provides compact theme-aware labels for status, category, and metadata, while
following the existing Finn UI component conventions for variants, tones, sizes,
radius, and direct style/className escape hatches.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `@finn-ui/react` exports `Badge` and Badge prop types.
- `Badge` supports `variant="solid" | "soft" | "outline"`.
- `Badge` supports `tone="primary" | "neutral" | "danger" | "success" | "warning"`.
- `Badge` supports `size="sm" | "md"` and `radius`.
- Storybook includes Badge stories for light, dark, custom, variants, tones,
  and sizes.
- The playground consumes `Badge` from `@finn-ui/react`.
- `pnpm release:check` passes.
- Durable Harness matrix and story evidence are updated.

## Design Notes

- Commands: `pnpm release:check`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: `Badge`, `BadgeProps`, `BadgeVariant`, `BadgeTone`, `BadgeSize`.
- Tables: none.
- Domain rules: Badge is a display component only; it does not own selection,
  navigation, or dismiss behavior.
- UI surfaces: `apps/storybook`, `apps/playground-web`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P6-001 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates Badge props and stories. |
| Integration | `pnpm check:packages` validates Badge package exports. |
| E2E | Not required; no user workflow is introduced. |
| Platform | `pnpm release:check` validates package, playground, and Storybook builds. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the first Phase 6 Web component expansion story.

## Evidence

- `pnpm release:check` passed.
