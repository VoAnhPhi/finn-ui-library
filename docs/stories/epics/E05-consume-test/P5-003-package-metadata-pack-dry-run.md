# P5-003 Package Metadata And Pack Dry Run

## Status

implemented

## Lane

normal

## Product Contract

Phase 5 should prove that Finn UI package artifacts are ready for a future npm
publish decision without publishing them yet. Package manifests should include
basic npm metadata, package READMEs should document usage, and release checks
should include npm pack dry-runs for `@finn-ui/tokens`, `@finn-ui/theme`, and
`@finn-ui/react`.

The packages remain private and public npm publishing stays out of scope.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `docs/RELEASE.md`
- `SPEC.md`

## Acceptance Criteria

- Each MVP package manifest includes license, homepage, repository, bugs, and
  keywords metadata.
- Each MVP package has a README with status, usage, and build guidance.
- Root scripts include a pack dry-run check.
- `pnpm release:check` includes the pack dry-run check.
- `pnpm check:pack` and `pnpm release:check` pass.
- Durable Harness matrix and story evidence are updated.

## Design Notes

- Commands: `pnpm check:pack`, `pnpm release:check`.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: npm package metadata and package tarball contents.
- Tables: none.
- Domain rules: package publish remains gated by maintainer decisions on
  visibility, license, versioning, and npm scope ownership.
- UI surfaces: none.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P5-003 --unit 1 --integration 1 --e2e 0 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | Package README and manifest metadata review. |
| Integration | `pnpm check:pack` validates npm pack dry-runs. |
| E2E | Not required; this is package artifact readiness. |
| Platform | `pnpm release:check` validates full release readiness. |
| Release | Durable Harness matrix and story evidence updated. |

## Harness Delta

Adds npm pack dry-runs to the release readiness ladder.

## Evidence

- `pnpm check:pack` passed.
- `pnpm release:check` passed.
