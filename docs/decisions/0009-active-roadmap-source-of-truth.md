# Active Roadmap Source Of Truth

Date: 2026-06-30

## Status

Accepted

## Context

The original `SPEC.md` defines Phase 6 as the React Native package. The current
durable Harness matrix and product docs used Phase 6 for Web React component
expansion after MVP package consumption was proven. Multiple traces recorded
this mismatch as repeated harness friction while completing Web component
stories.

Sprint 2 is broad and changes the theme runtime, Storybook organization, and
component styling model. Entering that sprint with conflicting phase labels
would force future agents to re-resolve the same roadmap ambiguity.

## Decision

Use product docs, story packets, and the durable Harness matrix as the active
roadmap source of truth after spec intake. Treat `SPEC.md` as historical input
material unless a later story or decision explicitly re-adopts a section.

For the current roadmap, Phase 6 means the implemented Web React component
expansion. React Native remains deferred until the Web API, CSS-variable theme
runtime, and Sprint 2 standardization work are stable.

## Alternatives Considered

1. Rewrite `SPEC.md` to match the current roadmap.
2. Rename the implemented Web expansion stories away from Phase 6.
3. Keep resolving the conflict inside each trace.

## Consequences

Positive:

- Future Sprint 2 work can follow the product docs and matrix without
  re-litigating the original Phase 6 label.
- React Native remains visible as a long-term goal without competing with
  Sprint 2 standardization.
- Repeated trace friction should drop for Phase 6 and Sprint 2 planning tasks.

Tradeoffs:

- `SPEC.md` is no longer a literal phase-by-phase roadmap.
- Future Native work needs a fresh initiative or story packet before
  implementation.

## Follow-Up

- Review the next five Sprint 2 traces for repeated roadmap-source friction.
- Create a Native initiative only after Sprint 2 stabilizes the Web API and
  theme runtime.
