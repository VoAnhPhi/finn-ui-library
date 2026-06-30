# P5-002 Package Readiness And Release Checklist

## Status

implemented

## Lane

normal

## Product Contract

Phase 5 should leave Finn UI with a repeatable release readiness check before
publishing or expanding package consumers. The check must prove that package
dist files exist, package manifests expose the expected entrypoints, ESM and CJS
consumers can load the public API, Storybook still builds, and the playground
consume test still builds.

This story does not publish packages to npm.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `docs/RELEASE.md`
- `SPEC.md`

## Acceptance Criteria

- A package export smoke check validates `@finn-ui/tokens`, `@finn-ui/theme`,
  and `@finn-ui/react`.
- The smoke check verifies manifest entrypoints, referenced dist files, ESM
  imports, and CJS requires.
- Root scripts include `check:packages` and `release:check`.
- Release readiness documentation explains the validation ladder and publish
  gates.
- `pnpm release:check` passes.
- Durable Harness matrix and story evidence are updated.

## Design Notes

- Commands: `pnpm check:packages`, `pnpm release:check`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: package public exports for tokens, theme, and React components.
- Tables: none.
- Domain rules: public npm publish is separate from local readiness and remains
  gated on maintainer decisions.
- UI surfaces: none.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P5-002 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` validates TypeScript contracts. |
| Integration | `pnpm check:packages` validates package manifests and ESM/CJS exports. |
| E2E | Not required; this is package readiness, not a browser workflow. |
| Platform | `pnpm release:check` validates package, playground, and Storybook build outputs. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds a repeatable package readiness command and release checklist.

## Evidence

- `pnpm check:packages` passed.
- `pnpm release:check` passed.
