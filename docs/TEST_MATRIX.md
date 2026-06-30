# Test Matrix

This file maps product behavior to proof.

No product behavior has been defined or implemented yet. Do not mark a row
implemented until tests or validation evidence exist.

## Status Values

| Status | Meaning |
| --- | --- |
| planned | Accepted as intended behavior, not implemented |
| in_progress | Actively being built |
| implemented | Implemented and proof exists |
| changed | Contract changed after earlier implementation |
| retired | No longer part of the product contract |

## Matrix

| Story | Contract | Unit | Integration | E2E | Platform | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P0-001 | Convert `SPEC.md` into living product docs and a Phase 0 story before implementation | no | no | no | no | implemented | `docs/product/finn-ui-overview.md`, `docs/stories/epics/E00-phase-0/P0-001-product-contract-and-foundation.md` |
| P1-001 | Scaffold Finn UI monorepo packages and Storybook foundation | yes | yes | no | yes | implemented | `pnpm build`, `pnpm typecheck`, `pnpm build:storybook` |
| P2-001 | Implement shared tokens, theme creation, light/dark themes, and React provider | yes | yes | no | yes | implemented | `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`, Storybook HTTP 200 |
| P3-001 | Implement React primitives Box, Text, and Stack | yes | yes | no | yes | implemented | `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`, Storybook HTTP 200 |
| P3-002 | Implement React Button component | yes | yes | no | yes | implemented | `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`, Storybook HTTP 200 |
| P3-003 | Implement React Input, Card, and Divider components | yes | yes | no | yes | implemented | `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`, Storybook HTTP 200 |
| P4-001 | Polish Storybook docs, theme comparison, and MVP component catalog | yes | yes | no | yes | implemented | `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`, Storybook HTTP 200 |
| P4-002 | Deploy Storybook static output online | yes | yes | no | yes | implemented | `https://storybook-static-eta-ten.vercel.app`, Vercel status `Ready` |

## Evidence Rules

- Unit proof covers pure domain and application rules.
- Integration proof covers backend enforcement, data integrity, provider
  behavior, jobs, or service contracts.
- E2E proof covers user-visible browser flows.
- Platform proof covers only shell, deployment, mobile, desktop, or runtime
  behavior that cannot be proven in lower layers.
- A story can be implemented without every proof column if the story packet
  explains why.
