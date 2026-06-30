# Validation

## Proof Strategy

The story is complete when local build proof and remote URL proof both pass.

## Test Plan

| Layer | Cases |
| --- | --- |
| Unit | `pnpm typecheck` validates package and Storybook types. |
| Integration | `pnpm build` validates package build boundaries. |
| E2E | Not required; hosted Storybook browsing beyond HTTP smoke is out of scope. |
| Platform | `pnpm build:storybook`, Vercel deploy, and HTTP check against returned URL. |
| Performance | Not required for this deploy story. |
| Logs/Audit | Harness story evidence and trace record. |

## Fixtures

- Built Storybook output at `apps/storybook/storybook-static`.
- Vercel CLI session available on the local machine.

## Commands

```text
pnpm typecheck
pnpm build
pnpm build:storybook
pnpm dlx vercel@latest deploy apps/storybook/storybook-static --prod --yes
```

## Acceptance Evidence

- `pnpm typecheck` passed.
- `pnpm build` passed.
- `pnpm build:storybook` passed.
- Vercel deployment id: `dpl_Bthy7q7ke84773yqvnQXSiCH9EAE`.
- Vercel deployment URL:
  `https://storybook-static-98wd9ox5w-anhphis-projects-43b40aca.vercel.app`.
- Vercel production alias: `https://storybook-static-eta-ten.vercel.app`.
- HTTP checks returned `200` for both URLs.
- `pnpm dlx vercel@latest inspect storybook-static-eta-ten.vercel.app`
  reported status `Ready`.
