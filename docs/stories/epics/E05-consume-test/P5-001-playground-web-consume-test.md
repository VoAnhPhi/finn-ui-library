# P5-001 Playground Web Consume Test

## Status

implemented

## Lane

normal

## Product Contract

Phase 5 proves that Finn UI can be consumed by a React application outside
Storybook. A Vite playground app should import `@finn-ui/react` and
`@finn-ui/theme` as workspace package dependencies, render the MVP components,
and switch between light, dark, and custom themes through `UIProvider`.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- `apps/playground-web` exists as a Vite React TypeScript app in the pnpm
  workspace.
- The app imports `UIProvider`, `Box`, `Text`, `Stack`, `Button`, `Input`,
  `Card`, and `Divider` from `@finn-ui/react`.
- The app imports `lightTheme`, `darkTheme`, and `createTheme` from
  `@finn-ui/theme`.
- The app renders an interactive theme switch and a controlled input.
- `pnpm typecheck`, `pnpm build`, and `pnpm build:playground` pass.
- Durable Harness matrix and story evidence are updated.

## Design Notes

- Commands: `pnpm typecheck`, `pnpm build`, `pnpm build:playground`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: package imports through `@finn-ui/react` and `@finn-ui/theme`.
- Tables: none.
- Domain rules: package consumption should be proven outside Storybook before
  expanding toward publishing, Native, or Theme Studio work.
- UI surfaces: `apps/playground-web`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P5-001 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates playground imports and component usage. |
| Integration | `pnpm build` validates package build and workspace boundaries. |
| E2E | Not required; no browser automation is required for this consume test. |
| Platform | `pnpm build:playground` validates Vite production output. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds Phase 5 consume-test proof expectations for a real React app using Finn UI
workspace packages.

## Evidence

- `pnpm typecheck` passed.
- `pnpm build` passed for `@finn-ui/tokens`, `@finn-ui/theme`, and
  `@finn-ui/react`.
- `pnpm build:playground` passed and wrote `apps/playground-web/dist`.
