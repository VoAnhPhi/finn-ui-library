# Stories

Stories are work packets. They turn product intent into bounded implementation
and validation work.

Current story status lives in the durable Harness matrix:

```powershell
.\scripts\bin\harness-cli.exe query matrix
```

Implemented story packets cover the Finn UI MVP foundation through the Phase 6
Web component expansion. Sprint 2 planning is tracked under:

```text
docs/stories/epics/E07-sprint-2-standardization/overview.md
```

## Normal Story

Use `docs/templates/story.md` for normal feature work.

Suggested path:

```text
docs/stories/epics/E01-domain-name/US-001-short-story-title.md
```

## High-Risk Story

Use `docs/templates/high-risk-story/` when the feature intake classifies work as
high-risk.

Suggested path:

```text
docs/stories/epics/E02-risky-domain/US-012-risky-story-title/
  execplan.md
  overview.md
  design.md
  validation.md
```

## Status Flow

```text
planned -> in_progress -> implemented
                  |
                  v
               changed
                  |
                  v
               retired
```
