# Academic PPT Pipeline Skill

A reusable Codex skill for building editable Chinese academic PowerPoint decks.

## What this repo contains

- `academic-ppt-pipeline-skill/`: the custom skill
- `package.json`: local execution entrypoint for the pipeline runner

## What the skill does

- accepts either structured materials or a topic-only brief
- routes PPT production with:
  - primary: `pptx-tfriedel`
  - fallback: `pptx-anthropic`
- keeps data-heavy pages editable
- emits prompt assets for external image generation
- targets conference-ready Chinese academic layouts

## Local usage

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

## Notes

- This repo is prepared for GitHub submission.
- It intentionally excludes local output, caches, and sensitive local files.
