# P6-005 Skeleton

## Status

implemented

## Lane

normal

## Product Contract

Phase 6 continues the Web React component expansion with `Skeleton`, a
theme-aware loading placeholder for cards, lists, and identity surfaces. It is
display-only, stateless, and supports size, radius, circle, animated, and direct
style/className escape hatches.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `@finn-ui/react` exports `Skeleton` and `SkeletonProps`.
- `Skeleton` supports `width`, `height`, `radius`, `circle`, `animated`, and
  style/className escape hatches.
- `Skeleton` supports static and animated loading placeholders without JS
  timers or effects.
- Storybook includes Skeleton stories for light, dark, custom, card, text line,
  circle, static, and animated states.
- The playground consumes `Skeleton` from `@finn-ui/react`.
- `pnpm release:check` passes.
- Durable Harness matrix and story evidence are updated.

## Design Notes

- Commands: `pnpm release:check`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: `Skeleton`, `SkeletonProps`.
- Tables: none.
- Domain rules: Skeleton is display-only and does not own loading state.
- UI surfaces: `apps/storybook`, `apps/playground-web`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P6-005 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates Skeleton props and stories. |
| Integration | `pnpm check:packages` validates Skeleton package exports. |
| E2E | Not required; no user workflow is introduced. |
| Platform | `pnpm release:check` validates package, playground, and Storybook builds. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the fifth Phase 6 Web component expansion story.

## Evidence

- `pnpm release:check` passed.
- Browser QA for Storybook `components-skeleton--light` passed with text,
  circle, static/animated states, dimensions, and no console errors.
