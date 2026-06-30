# P1-001 Monorepo Foundation

## Status

implemented

## Lane

normal

## Product Contract

Phase 1 creates the Finn UI monorepo foundation required by the MVP:
workspace configuration, package folders, build scripts, TypeScript baseline,
and a Storybook app shell.

This phase proves the repo can install dependencies, typecheck package
boundaries, and build the initial library packages. It intentionally does not
implement real tokens, themes, or UI components beyond foundation exports.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- Root workspace files exist: `package.json`, `pnpm-workspace.yaml`,
  `tsconfig.base.json`, and `tsconfig.json`.
- Package folders exist for `@finn-ui/tokens`, `@finn-ui/theme`, and
  `@finn-ui/react`.
- `apps/storybook` exists with a minimal Storybook configuration.
- Packages have build and typecheck scripts.
- Workspace dependencies use local `workspace:*` links between Finn UI
  packages.
- `pnpm install`, `pnpm build`, and `pnpm typecheck` run successfully.
- No real component API is claimed as implemented in Phase 1.

## Design Notes

- Commands: `pnpm install`, `pnpm build`, `pnpm typecheck`,
  `pnpm --filter storybook build`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: placeholder package exports only.
- Tables: none.
- Domain rules: Phase 1 establishes package boundaries; Phase 2 owns real
  tokens/theme implementation and Phase 3 owns components.
- UI surfaces: minimal Storybook foundation story only.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P1-001 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates TypeScript boundaries. |
| Integration | `pnpm build` validates package build order and workspace links. |
| E2E | Not required; no user workflow is implemented yet. |
| Platform | Optional Storybook static build proof if dependencies support it. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds the first implementation story after Phase 0 and records monorepo
foundation proof expectations in the durable Harness matrix.

## Evidence

- `pnpm install` completed successfully after approving `esbuild` build scripts.
- `pnpm build` passed for `@finn-ui/tokens`, `@finn-ui/theme`, and
  `@finn-ui/react`.
- `pnpm typecheck` passed for packages and `apps/storybook`.
- `pnpm build:storybook` completed successfully and wrote
  `apps/storybook/storybook-static`.
- Storybook build reported the default large chunk warning, but no build
  failure.
- Storybook dev server was started at `http://127.0.0.1:6006/` and returned
  HTTP 200.
