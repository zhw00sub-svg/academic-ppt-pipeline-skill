# Academic PPT Pipeline Skill

A reusable Codex skill for building editable Chinese academic PowerPoint decks.

## Positioning

This repository is not just a slide script.
It is a custom production skill for:
- Chinese academic PPT planning
- editable `.pptx` delivery
- evidence-aware page design
- external image-prompt coordination
- personal style-corpus learning from the user's own historical `pdf + pptx` decks
- repeatable project execution

## What this repo contains

- `academic-ppt-pipeline-skill/`
  The custom skill itself
- `package.json`
  Local execution entrypoint for the pipeline runner

## Core capabilities

- accepts either:
  - structured materials
  - topic-only / partial-input mode
- routes PPT production with:
  - primary: `pptx-tfriedel`
  - fallback: `pptx-anthropic`
- keeps evidence-heavy pages editable
- emits prompt assets for external image generation
- packages NanoBanana-ready prompt docs as standalone Word guidance when needed
- targets conference-ready Chinese academic layouts
- can prioritize a personal body-page style corpus over generic template aesthetics
- distinguishes:
  - minimum-pass delivery
  - target-delivery standard

## V2 architecture

This skill is moving from “direct PPT generation” toward an asset-driven production architecture:

1. `content pipeline`
   - framework
   - material ingestion
   - content allocation
   - copy refinement
2. `visual pipeline`
   - figure / table / chart extraction
   - chart remake
   - external image prompt generation
   - asset sourcing
3. `asset registry`
   - slide-level indexing of copy, numbers, refs, figures, charts, icons, prompts, and layout intent
4. `design system pipeline`
   - palette logic
   - template / body-page match
   - final editable `.pptx` assembly

See:
- `academic-ppt-pipeline-skill/references/v2-architecture.md`

## Standard startup flow

Every new project should start from the same production sequence:

1. capture a project-specific style intake if needed
2. normalize inputs
3. run content pipeline
4. run visual pipeline
5. build asset registry by slide
6. assemble editable `.pptx`
7. package external image prompts
8. run QA

Detailed SOP:
- `academic-ppt-pipeline-skill/references/project-startup-flow.md`
- `academic-ppt-pipeline-skill/references/style-intake-template.md`

## Style precedence

This repository no longer assumes one permanently fixed style for every deck.

Each run should first choose one startup style source:

1. `强对比浓重风` (`preset1`)
   current integrated strong-contrast style derived from the user's corpus
2. `轻快医学信息风` (`preset2`)
   lighter calm evidence-summary medical palette
3. `自定义风格` (`custom`)
   user-written project style brief

Each run should resolve style in this order:

1. project-specific style intake
2. personal style corpus
3. skill default visual system

This lets the same workflow produce:
- decks close to the user's established style
- deliberate one-off style deviations for a specific event
- neutral fallback decks when no style brief exists

## Input modes

### Structured materials

Use when you have some or all of:
- outline `docx`
- planning `xlsx`
- template `pptx`
- literature `pdf` folder
- approved benchmark image
- personal style reference `pdf + pptx` corpus

### Topic-only mode

Use when you only have:
- a topic
- a lecture title
- or a partial brief

The pipeline will still generate:
- a run manifest
- an execution brief
- a topic-only outline seed
- image prompt pack
- delivery checklist

## Quick start

Install dependencies:

```bash
npm install
```

Run the execution entrypoint:

```bash
npm run academic-ppt-pipeline -- \
  --topic "示例主题" \
  --style-preset "preset2" \
  --outline "/path/to/outline.xlsx" \
  --template "/path/to/template.pptx" \
  --literature "/path/to/literature-folder" \
  --style-brief "/path/to/style-brief.md" \
  --benchmark-image "/path/to/benchmark.png" \
  --output-dir "output/demo_run"
```

You can also pass a short inline style override:

```bash
npm run academic-ppt-pipeline -- \
  --topic "示例主题" \
  --style-preset "custom" \
  --style-brief-text "White background, denser evidence pages, stronger brick red accents, less rounded-card feeling, no keynote emptiness." \
  --output-dir "output/demo_run"
```

## Example outputs

Each run now creates a standard package:

- `01_intake/`
  Input detection, extraction, run manifest
- `02_planning/`
  Workflow brief, execution prompt, topic-only outline seed if needed
- `03_prompts/`
  External image prompt pack, including NanoBanana-ready English prompts and Word guidance when applicable
- `04_delivery/`
  Delivery checklist and quality rubric

## Real project example

See the already generated example package in the working environment:
- `output/academic_ppt_run_demo`

## How to update the skill

### Local update workflow

1. Edit files inside:
   - `academic-ppt-pipeline-skill/`
   - `README.md`
   - `package.json`
2. Test the runner locally:

```bash
npm run academic-ppt-pipeline -- --topic "测试主题" --output-dir "output/test_run"
```

3. Review the generated package structure.
4. Commit locally:

```bash
git add .
git commit -m "Describe the update"
```

### Push updates to GitHub

If your local repo is already connected to GitHub:

```bash
git push
```

Or use GitHub Desktop:
- open the repo
- review changes
- commit
- push origin

## Notes

- This repo intentionally excludes local output, caches, and sensitive local files.
- The production target is not just “usable”; the intended standard is near-ready academic delivery.
- Image prompts should be written in English for model control.
- If an image must contain words, require exact Simplified Chinese strings instead of generic “Chinese text”.
- The default image workflow is prompt-first external generation, because a stable long-term integrated API may not exist.
- Flow diagrams, pathway visuals, and concept structures should prefer external image generation prompts over weak native line art when aesthetics matter.
- If the user supplies historical decks, those decks should become the highest-priority style truth for body pages.
