# Sprint 2: Component Standardization + Theme System + Real Usage Demo

## Status

planned

## Source

Derived from `SPEC-2.md` after reviewing the current codebase, Harness matrix,
and available frontend skills.

## Goal

Move Finn UI from "components render and build" to "components are reliable
enough to use in a real personal React project."

Sprint 2 should prove that a real React app can import `@finn-ui/react`, wrap
the app with `UIProvider`, use the core MVP components, switch between
light/dark/custom themes, and see the entire UI respond through the theme
system.

## Current State

| Area | Current repo state | Sprint 2 gap |
| --- | --- | --- |
| MVP packages | `@finn-ui/tokens`, `@finn-ui/theme`, and `@finn-ui/react` exist and build. | Theme needs stronger semantic keys and CSS variable runtime. |
| Core MVP components | `Box`, `Text`, `Stack`, `Button`, `Input`, `Card`, and `Divider` exist. | Components need more standardized state, styling, and Storybook coverage. |
| Phase 6 components | `Badge`, `FormField`, `Checkbox`, `Switch`, `Avatar`, and `Skeleton` exist. | Sprint 2 should not expand new components unless needed for the demo. |
| Theme provider | `UIProvider` currently provides React context only. | `UIProvider` should inject `--finn-*` CSS variables on a wrapper element. |
| Component styling | Components mostly compute inline `CSSProperties` from `useTheme`. | Move important visual recipes toward `className`, data attributes, and CSS variables while preserving escape hatches. |
| CSS variables | No `--finn-*` CSS variables were found in the current code. | Add variable generation and a naming convention such as `--finn-color-primary`. |
| Storybook | Stories exist but are mostly flat under `apps/storybook/src`. | Reorganize into `foundation`, `components`, and `examples`; add a global theme decorator. |
| Real usage app | `apps/playground-web` exists as the consume-test app. | Add `apps/demo` as a public-ready landing showcase if selected. |
| Validation | Existing baseline uses `pnpm typecheck`, `pnpm build`, `pnpm build:storybook`, release checks, and Browser QA. | Add demo build and rendered QA for Storybook and demo flows. |

## Risk Classification

Lane: high-risk initiative.

Reason:

- Touches public component APIs and existing behavior.
- Touches multiple packages and apps.
- Changes the theme runtime model.
- Requires rendered UI validation, not only TypeScript/build proof.
- Existing tests are mostly build and smoke checks, so proof is relatively weak.

Implementation should be sliced into smaller normal or high-risk stories before
code changes begin.

## Candidate Work Slices

| Candidate story | Purpose | Notes |
| --- | --- | --- |
| S2-001 Storybook source cleanup | Reorganize Storybook and remove stale/demo-only structure. | Good first slice before deeper component work. |
| S2-002 Theme CSS variable runtime | Add semantic theme keys, custom theme, CSS variable generation, and provider injection. | Main technical foundation for Sprint 2. |
| S2-003 Button/Input/Card recipes | Move the most important interactive components toward recipe/data-attribute styling. | Highest user-visible component quality impact. |
| S2-004 Primitive standardization | Standardize `Box`, `Text`, `Stack`, and `Divider` around theme-aware props and baseline states. | Should preserve existing API where possible. |
| S2-005 Storybook controls/actions/theme switcher | Add global theme decorator, structured stories, controls, and actions. | Requires Browser QA. |
| S2-006 Demo landing app | Add `apps/demo` using Finn UI components directly. | Use the frontend app builder skill for visual concept and QA. |
| S2-007 Validation and release readiness | Update scripts, package export checks, builds, and manual QA evidence. | Should close the sprint after component/demo work. |

## Recommended Order

1. Close Sprint 1 with Storybook/source cleanup.
2. Stabilize theme tokens and semantic colors.
3. Implement CSS variable generation and `UIProvider` injection.
4. Refactor `Button`, `Input`, and `Card` recipes.
5. Standardize `Box`, `Text`, `Stack`, and `Divider`.
6. Rebuild Storybook organization, controls, actions, and theme switcher.
7. Create `apps/demo` landing showcase.
8. Run full validation and update durable story proof.

## Skills And Tools To Use

| Capability | Tool or skill | Use |
| --- | --- | --- |
| Code discovery | codebase-memory MCP | Prefer `search_graph`, `get_code_snippet`, `get_architecture`, and `search_code` before shell search. |
| Harness workflow | `scripts/bin/harness-cli.exe` | Intake, story tracking, matrix, trace, backlog, and verification records. |
| React implementation guidance | `build-web-apps:react-best-practices` | Apply Vercel React performance rules during component refactors. |
| Demo app visual build | `build-web-apps:frontend-app-builder` | Use when building/polishing `apps/demo` landing showcase. |
| Rendered frontend QA | `build-web-apps:frontend-testing-debugging` | Use for Storybook/demo local browser checks, screenshots, console health, and interactions. |
| Browser validation | `browser:control-in-app-browser` | Prefer Browser plugin before standalone Playwright for local UI checks. |

## Validation Shape

Minimum expected proof for Sprint 2 slices:

| Layer | Expected proof |
| --- | --- |
| Unit | TypeScript typecheck and focused tests if added for recipes/provider helpers. |
| Integration | Package build, package export audit, Storybook build, demo build. |
| E2E | Browser QA for theme switching, Button states, Input states, and demo landing. |
| Platform | Storybook/demo local HTTP checks and deploy smoke if deployment is selected. |
| Release | `pnpm release:check` after the sprint is complete or before publishing/deploying claims. |

## Non-Goals

Do not include these in Sprint 2 unless the scope is explicitly changed:

- React Native package.
- Theme Studio.
- Public npm publishing.
- New complex components such as DataTable, DatePicker, Calendar, complex
  Dropdown, RichTextEditor, or custom animation system.
- Full accessibility audit.
- Heavy visual regression pipeline.
- Component copy-code system.

## Implementation Guardrails

- Preserve existing component imports and common props unless a story explicitly
  changes the public API.
- Prefer semantic theme values over primitive color names inside components.
- Keep `style` and `className` as escape hatches, not the primary styling path.
- Use CSS variables for runtime theme changes.
- Use data attributes for component recipe states and variants.
- Do not let `apps/demo` become a separate large product; it is a showcase and
  real usage proof for the library.
- Do not treat Storybook as the product; the package API remains the product.

## Open Questions

- Should `apps/playground-web` remain as the smoke consume-test while
  `apps/demo` becomes the public showcase, or should one replace the other?
- Should CSS recipe files live inside each component folder or in a shared
  `packages/react/src/styles` layer?
- Should Phase 6 components be migrated to CSS variables during Sprint 2, or
  should the first pass focus only on the MVP seven components?
