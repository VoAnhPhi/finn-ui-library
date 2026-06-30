# P0-001 Product Contract And Foundation

## Status

implemented

## Lane

normal

## Product Contract

Phase 0 turns the original `SPEC.md` into smaller living artifacts so future
implementation work has a clear product contract, story boundary, and proof
expectations before code is scaffolded.

This phase does not create application packages. It prepares the repo to start
Phase 1 without treating the monolithic spec as the only source of truth.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Acceptance Criteria

- A product overview exists under `docs/product/` and captures the Finn UI
  vision, MVP scope, component set, theme-first philosophy, Storybook role, and
  deferred scope.
- A Phase 0 story exists under `docs/stories/` with lane, contract, acceptance
  criteria, validation shape, and harness delta.
- The test matrix lists Phase 0 as implemented with no false proof claims.
- Durable Harness records include the Phase 0 story and proof status.
- No app/package scaffolding is performed in Phase 0.

## Design Notes

- Commands: Harness CLI for intake, story, matrix, and trace records.
- Queries: `scripts/bin/harness-cli.exe query matrix`.
- API: none.
- Tables: Harness durable `story` and `trace` tables only.
- Domain rules: `SPEC.md` is input material; product docs and stories become
  the working contract for implementation.
- UI surfaces: none.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id P0-001 --unit 0 --integration 0 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | Not applicable; no product code is created in Phase 0. |
| Integration | Not applicable; no package or service integration exists yet. |
| E2E | Not applicable; no rendered UI exists yet. |
| Platform | Not applicable; no deployable artifact exists yet. |
| Release | Confirm docs and durable Harness records exist. |

## Harness Delta

Phase 0 creates the first project-specific product doc and story packet from
the supplied spec. It also records the story in the durable Harness database so
future `query matrix` output can guide implementation work.

## Evidence

- `scripts/bin/harness-cli.exe query matrix` shows `P0-001` as implemented.
- `docs/product/finn-ui-overview.md` exists as the living product overview.
- No app/package scaffolding was performed in Phase 0.
