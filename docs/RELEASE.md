# Release Readiness

Finn UI is still pre-release. The current release process proves local package
readiness, Storybook output, and playground consumption before any npm publish
step is attempted.

## Current Publish Status

The packages remain private:

- `@finn-ui/tokens`
- `@finn-ui/theme`
- `@finn-ui/react`

Do not publish them publicly until the maintainer has selected package
visibility, versioning rules, and npm scope ownership.

## Release Check

Run the full release readiness check from the repository root:

```powershell
pnpm release:check
```

This runs:

1. `pnpm typecheck`
2. `pnpm check:packages`
3. `pnpm check:pack`
4. `pnpm build:playground`
5. `pnpm build:storybook`

`pnpm check:packages` builds the package dist outputs and verifies that each
package has `main`, `module`, `types`, and `exports` entries, that the referenced
dist files exist, and that both ESM `import()` and CJS `require()` expose the
expected public API.

`pnpm check:pack` builds the package dist outputs and runs npm pack dry-runs for
`@finn-ui/tokens`, `@finn-ui/theme`, and `@finn-ui/react`. This verifies the
future package artifact shape without publishing to npm.

## Manual Proof Checklist

Before a release branch or publish attempt:

- Install dependencies with `pnpm install`.
- Run `pnpm release:check`.
- Confirm Storybook deploy settings still use:
  - Build command: `pnpm build:storybook`
  - Output directory: `apps/storybook/storybook-static`
- Open the playground with `pnpm playground` and verify:
  - the app loads,
  - light/dark/custom theme switching works,
  - the controlled input updates,
  - the browser console has no app errors.
- Check `scripts/bin/harness-cli.exe query matrix` and confirm the relevant
  story proof rows are current.

## Before Public npm Publish

When the project is ready to publish outside the workspace:

1. Choose versioning policy for all packages.
2. Confirm npm ownership for the `@finn-ui` scope.
3. Decide public vs private npm package visibility.
4. Remove `private: true` from packages intended for npm publish.
5. Confirm package metadata: description, license, repository, keywords, and
   package README coverage.
6. Run `pnpm release:check`.
7. Review the `pnpm check:pack` output for each publishable package before
   publishing.

Public publish remains out of scope for the current MVP readiness story.
