# Academic PPT Pipeline Skill

A reusable Codex skill for building editable Chinese academic PowerPoint decks.

## Positioning

This repository is not just a slide script.
It is a custom production skill for:
- Chinese academic PPT planning
- editable `.pptx` delivery
- evidence-aware page design
- external image-prompt coordination
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
- targets conference-ready Chinese academic layouts
- distinguishes:
  - minimum-pass delivery
  - target-delivery standard

## Input modes

### Structured materials

Use when you have some or all of:
- outline `docx`
- planning `xlsx`
- template `pptx`
- literature `pdf` folder
- approved benchmark image

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
  --outline "/path/to/outline.xlsx" \
  --template "/path/to/template.pptx" \
  --literature "/path/to/literature-folder" \
  --benchmark-image "/path/to/benchmark.png" \
  --output-dir "output/demo_run"
```

## Example outputs

Each run now creates a standard package:

- `01_intake/`
  Input detection, extraction, run manifest
- `02_planning/`
  Workflow brief, execution prompt, topic-only outline seed if needed
- `03_prompts/`
  External image prompt pack
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
