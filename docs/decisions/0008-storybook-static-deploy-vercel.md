# Storybook Static Deploy Via Vercel

Date: 2026-06-29

## Status

Accepted

## Context

Finn UI needs a public online Storybook preview URL. The repo already builds
Storybook static output and the spec lists Vercel as an acceptable deploy
target.

## Decision

Deploy the static Storybook output in `apps/storybook/storybook-static` with
the Vercel CLI for this story.

## Alternatives Considered

1. GitHub Pages.
2. Netlify.
3. Chromatic.

## Consequences

Positive:

- Produces a shareable Storybook URL quickly from the existing static build.
- Does not require adding app runtime code.

Tradeoffs:

- The deploy depends on local Vercel authentication.
- Automatic Git-connected deploys and custom domains remain out of scope.

## Follow-Up

- Consider a separate story for Git-connected continuous Storybook deploys.
