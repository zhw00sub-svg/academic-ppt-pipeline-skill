# Update Workflow

## Purpose

This skill is expected to evolve.
Updates should improve the production system, not just patch one project.

## What counts as a good update

- better execution reliability
- better editable PPT output
- stronger topic-only fallback
- clearer prompt standards
- cleaner repository usability
- better coordination between PPT layout and external image generation
- better Chinese-language image control for Chinese presentation use cases
- better extraction and reuse of the user's own historical style corpus

## Recommended update sequence

1. Edit the relevant skill files.
2. Run the pipeline locally.
3. Inspect the output package.
4. Decide whether the change improved:
   - quality
   - repeatability
   - usability
   - prompt-language clarity for image generation
   - Chinese text reliability when images must contain visible words
5. Commit only after a successful local run.
6. If the user added new historical decks, update the personal style profile before treating the style change as complete.

## Keep these stable unless intentionally changed

- primary vs fallback PPT routing
- target-delivery standard
- editable-first principle
- external image prompt role
- English-prompt / Simplified-Chinese-text rule for image workflows
- personal style corpus as the highest-priority truth for recurring body-page design
