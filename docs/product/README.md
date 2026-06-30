# Product Docs

This directory contains the living product contract for Finn UI.

`SPEC.md` and later sprint specs are input material. After intake, accepted
scope should be reflected here, in story packets, and in the durable Harness
matrix instead of relying on the original spec as the active plan.

Current product contract:

- `finn-ui-overview.md` covers the theme-first library vision, MVP scope,
  implemented phases, deferred scope, and current Sprint 2 direction.

Add new product docs only when a selected story needs a more focused contract
surface.

## Update Rule

When behavior changes:

1. Update the affected product doc.
2. Update or create the story packet.
3. Update durable proof status with `scripts/bin/harness-cli story add` or
   `scripts/bin/harness-cli story update`.
4. Record a decision if the change affects architecture, scope, risk, or a
   previously settled product rule.
