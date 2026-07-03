# Next Task Workflow

Use this workflow at the end of every implementation task so handoff does not
stop at "done" without the next concrete move.

## Required End-Of-Task Steps

1. Check the durable Harness matrix:
   `scripts/bin/harness-cli.exe query matrix`
2. Check the relevant epic overview and `docs/TEST_MATRIX.md`.
3. Find the next planned or unimplemented story in the recommended order.
4. If markdown docs and Harness disagree, mention the mismatch and prefer the
   durable Harness matrix plus accepted decisions.
5. End the final response with:
   - `Next task: <story id/title>`
   - one ready-to-use prompt using local skill shortcuts when helpful.

## Output Shape

```text
Next task: S2-006 Demo landing app

Suggested prompt:
@architect @UI @UX @frontend lam S2-006 Demo landing app, tiep tuc ghi UIUX workflow log va de xuat next task
```

## Current Sprint 2 Order

Completed:

- `S2-001` Storybook source cleanup
- `S2-002` Theme CSS variable runtime
- `S2-003` Button/Input/Card recipes
- `S2-004` Primitive standardization
- `S2-005` Storybook controls/actions/theme switcher

Next:

- `S2-006` Demo landing app
- `S2-007` Validation and release readiness
