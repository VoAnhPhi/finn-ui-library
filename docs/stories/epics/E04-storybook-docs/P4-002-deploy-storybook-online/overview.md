# Overview

## Current Behavior

Storybook builds locally and the dev server responds at `http://127.0.0.1:6006/`,
but there is no public online URL for sharing Finn UI documentation.

## Target Behavior

Storybook static output is deployed online and a public URL is recorded in the
story evidence.

Current production alias:

- `https://storybook-static-eta-ten.vercel.app`

## Affected Users

- Finn UI maintainer.
- Consumers who need to preview Finn UI components and themes.

## Affected Product Docs

- `docs/product/finn-ui-overview.md`
- `SPEC.md`

## Non-Goals

- Connecting the Git repository for automatic deploys.
- Custom production domain setup.
- Public npm package publishing.
- Deploying Theme Studio or sample apps.
