# Design

## Domain Model

Storybook static output is the deployable artifact. The deploy target is a
Vercel-hosted static site URL returned by the CLI.

## Application Flow

1. Build packages and Storybook.
2. Upload `apps/storybook/storybook-static` with Vercel CLI.
3. Record the resulting URL.
4. Verify the URL with an HTTP request.

## Interface Contract

The external interface is a public HTTPS Storybook URL.

## Data Model

No application data model changes.

## UI / Platform Impact

The platform impact is a public hosted Storybook documentation surface.

## Observability

Evidence is captured through Harness story evidence and trace records. No
runtime logging is added.

## Alternatives Considered

1. Vercel static deploy from Storybook output.
2. GitHub Pages, deferred because Vercel is already listed in the spec deploy
   options and the CLI is available in this environment.
3. Netlify or Chromatic, deferred because no existing project/tooling is
   configured here.
