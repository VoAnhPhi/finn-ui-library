# Exec Plan

## Goal

Deploy the built Storybook static site online and record a shareable URL.

## Scope

In scope:

- Verify local Storybook build.
- Use Vercel CLI to deploy `apps/storybook/storybook-static`.
- Verify the returned URL over HTTP.
- Update Harness story, matrix, trace, and decision records.

Out of scope:

- Git-connected continuous deployment.
- Custom domain or DNS.
- Provider-specific team/project policy changes beyond this deploy.

## Risk Classification

Risk flags:

- External systems: Vercel deploy.
- Public contracts: public Storybook URL becomes a shareable preview surface.
- Weak proof: no registered deploy-verification provider exists.

Hard gates:

- External provider behavior.

## Work Phases

1. Discovery: check Vercel CLI/session and Harness deploy capability.
2. Design: choose static Storybook deploy via Vercel CLI.
3. Validation planning: local build plus remote HTTP check.
4. Implementation: run Storybook build and Vercel deploy.
5. Verification: open returned URL and confirm HTTP 200.
6. Harness update: record story evidence, decision, and trace.

## Stop Conditions

Pause for human confirmation if:

- Vercel authentication fails.
- CLI asks to create or modify an unexpected team/project.
- Deploy requires paid features or custom domain changes.
- Validation requirements need to be weakened.
