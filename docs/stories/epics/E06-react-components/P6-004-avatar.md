# P6-004 Avatar

## Status

implemented

## Lane

normal

## Product Contract

Phase 6 continues the Web React component expansion with `Avatar`, a compact
identity display for users and workspaces. It supports image and fallback
states, theme-aware tone, size, radius, and direct style/className escape
hatches through standard HTML props.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `@finn-ui/react` exports `Avatar` and Avatar prop types.
- `Avatar` supports `src`, `alt`, `fallback`, `size`, `tone`, `radius`, and
  style/className escape hatches.
- `Avatar` renders an image when `src` is provided and fallback content when it
  is not.
- Storybook includes Avatar stories for light, dark, custom, image, fallback,
  tones, sizes, and radius.
- The playground consumes `Avatar` from `@finn-ui/react`.
- `pnpm release:check` passes.
- Durable Harness matrix and story evidence are updated.

## Design Notes

- Commands: `pnpm release:check`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: `Avatar`, `AvatarProps`, `AvatarTone`, `AvatarSize`.
- Tables: none.
- Domain rules: Avatar is display-only and does not fetch or persist identity
  data.
- UI surfaces: `apps/storybook`, `apps/playground-web`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P6-004 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates Avatar props and stories. |
| Integration | `pnpm check:packages` validates Avatar package exports. |
| E2E | Not required; no user workflow is introduced. |
| Platform | `pnpm release:check` validates package, playground, and Storybook builds. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the fourth Phase 6 Web component expansion story.

## Evidence

- `pnpm release:check` passed.
- Browser QA for Storybook `components-avatar--light` passed with fallback,
  image, dimensions, and no console errors.
