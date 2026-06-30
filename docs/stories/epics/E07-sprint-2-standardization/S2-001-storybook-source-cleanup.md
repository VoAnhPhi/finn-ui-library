# S2-001 Storybook Source Cleanup

## Status

implemented

## Lane

normal

## Product Contract

Storybook should present Finn UI as a current component documentation surface,
not as a phase-by-phase implementation log. Current component, theme, and usage
proof should remain available under stable groups.

## Relevant Product Docs

- `docs/product/finn-ui-overview.md`
- `docs/stories/epics/E07-sprint-2-standardization/overview.md`

## Acceptance Criteria

- Storybook source files are organized under `foundation`, `components`, and
  `examples` groups.
- Stale phase/catalog pages are removed or renamed so the sidebar no longer
  exposes `Component Catalog`, `Finn UI MVP catalog`, `Phase 2`, or generic
  `Overview` entries.
- Useful theme and component coverage from the removed pages remains available
  in current stories.
- Component imports and public package APIs remain unchanged.

## Design Notes

- Commands: no new package commands.
- Queries: no data queries.
- API: no public API changes.
- Tables: no data model changes.
- Domain rules: Storybook documents the current Web React package.
- UI surfaces: Storybook sidebar and existing component previews.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id <id> --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | `pnpm typecheck` |
| Integration | `pnpm build:storybook` |
| E2E | Not required for source cleanup unless rendered navigation breaks. |
| Platform | Storybook build output includes the reorganized stories. |
| Release | Not required for this slice. |

## Harness Delta

No harness rule changes expected.

## Evidence

- `pnpm typecheck` passed.
- `pnpm build:storybook` passed with the known Vite chunk-size warning.
- `scripts/bin/harness-cli story verify S2-001` passed.
- `rg "Component Catalog|Finn UI MVP catalog|Foundation/Phase 2|Themes/Comparison|Primitives/Overview" apps/storybook/storybook-static apps/storybook/src`
  returned no matches.
