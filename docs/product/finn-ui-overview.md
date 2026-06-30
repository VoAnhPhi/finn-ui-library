# Finn UI Product Overview

## Source

This product contract is derived from `SPEC.md`. Treat this file and the story
packets as the living planning surface for implementation work. `SPEC.md`
remains the original input spec.

## Product Vision

Finn UI is a reusable UI library for personal projects and small teams. It
should let multiple applications share a coherent visual style while still
allowing each application to adapt the brand through a theme.

The long-term direction is a cross-platform UI library for Web and React Native
with shared design tokens, a shared theme system, Storybook documentation, and a
future Theme Studio for editing themes visually.

## Product Philosophy

Finn UI is theme-first:

- Primary customization happens through the theme.
- Secondary customization happens through component props.
- Direct `style` and `className` overrides are escape hatches.

The library should avoid hard-locking every visual decision, but it should also
avoid making component styling so open-ended that applications become visually
inconsistent.

## MVP Scope

The MVP should prove that another React application can import Finn UI,
wrap its app with `UIProvider`, use the core components, and change the visual
system from one theme object.

The initial package scope is:

- `@finn-ui/tokens`
- `@finn-ui/theme`
- `@finn-ui/react`
- `apps/storybook`

React Native, icons, and Theme Studio are intentionally deferred until the Web
API and theme model are stable.

## MVP Components

The first component set is:

- `Box`
- `Text`
- `Stack`
- `Button`
- `Input`
- `Card`
- `Divider`

Components should share these API conventions where relevant:

- `variant` for presentation style.
- `tone` for semantic color.
- `size` for scale.
- `radius` for border radius.
- `fullWidth`, `disabled`, and `loading` for common interaction states.
- `leftIcon` and `rightIcon` for icon slots.
- `style` and `className` as escape hatches on Web components.

## Theme System

The theme package should provide:

- `createTheme`
- `lightTheme`
- `darkTheme`
- `Theme` types
- component-level theme config

The React package should provide:

- `UIProvider`
- `useTheme`

Theme values should include colors, spacing, radius, typography, shadow,
border width, opacity, z-index, duration, and easing as the implementation
requires them.

## Storybook

Storybook is the MVP documentation and preview surface. It should support:

- component preview
- prop and variant testing
- theme preview
- docs pages
- deployable static output

Expected static deploy shape:

- Build command: `pnpm --filter storybook build`
- Output directory: `apps/storybook/storybook-static`

Current online Storybook:

- Production alias: `https://storybook-static-eta-ten.vercel.app`
- Deployment URL:
  `https://storybook-static-98wd9ox5w-anhphis-projects-43b40aca.vercel.app`

## Deferred Scope

Do not include these in the MVP unless explicitly selected by a later story:

- React Native package
- Theme Studio
- public npm publishing
- complex dropdowns
- data tables
- calendar/date picker
- rich text editor
- custom animation system
- full accessibility audit
- visual regression suite

## Phase Order

Phase 0 establishes product contract, story packets, validation expectations,
and implementation boundaries.

Phase 1 builds the monorepo foundation.

Phase 2 builds tokens and theme.

Phase 3 builds Web components.

Phase 4 builds Storybook and deployable docs.

Phase 5 validates package consumption in a real React app.

Phase 6 ports stable APIs to React Native.

Phase 7 builds Theme Studio.
