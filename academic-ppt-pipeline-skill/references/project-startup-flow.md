# Project Startup Flow

## Purpose

This file defines the standard startup flow for every new academic PPT project.

It exists so the workflow does not depend on memory or ad hoc prompting.
Every new deck should begin from this structure unless a special case clearly requires a deviation.

## Default startup sequence

### 0. Capture the style intake first

Before the workflow starts building slides, capture one front-loaded project style brief.

This should be treated as a compact style prompt box, not a long interview.

The startup should first resolve one of three style-entry choices:

- `preset1`
  - the user's current integrated stronger-contrast corpus style
- `preset2`
  - the lighter calm medical evidence-summary palette
- `custom`
  - a manual project-specific style brief

User-facing labels should be:

- `强对比浓重风`
  - internal key: `preset1`
- `轻快医学信息风`
  - internal key: `preset2`
- `自定义风格`
  - internal key: `custom`

Then resolve the style mode:

- `override`
- `merge`
- `fallback`

Allowed outcomes:

- `override`
  - this run should follow the custom style brief first
- `merge`
  - this run should combine the custom style brief with the personal style corpus
- `fallback`
  - no project-specific style brief was provided, so use the personal corpus or the skill default

The style intake should define only the variables that materially change the deck:

- palette direction
- density target
- image realism / flatness
- title band strength
- preferred layout grammar
- anti-patterns for this run
- whether this project should stay close to the user's historical body-page style or intentionally deviate

Output:
- startup style choice
- style mode
- style source
- style override notes
- anti-patterns
- project-specific visual anchor

### 1. Confirm the production mode

Identify which of the following modes applies:

- `structured_materials`
  - the user provides outline / workbook / template / literature / style references
- `partial_materials`
  - the user provides only some of the above
- `topic_only`
  - the user provides only the topic, lecture intent, or a rough title

If requirements are already explicit, do not prolong intake.
Lock assumptions quickly and continue.

### 2. Build the source bundle

Normalize all available inputs:

- lecture brief
- `xlsx` or `docx` outline
- template `pptx`
- literature `pdf`
- URLs / DOI / PMID
- personal style corpus
- project-specific style intake
- benchmark images

Output:
- input summary
- source-of-truth judgment
- missing pieces
- production risks
- style source for this run

### 3. Start the content pipeline

Do not make slides yet.

First complete:
- framework co-creation
- material ingestion
- content allocation
- copy refinement

Output:
- slide sequence
- page goals
- evidence-bound claims
- on-screen text direction
- speaker-note direction

### 4. Start the visual pipeline

In parallel, determine visual assets:

- which paper figures or screenshots should be extracted
- which charts must be remade natively
- which pages need external image prompts
- which pages should avoid AI images entirely
- whether icons or sourced graphics are needed

Output:
- figure candidates
- chart remake list
- image prompt list
- graphic asset list

### 5. Build the asset registry

Before PPT assembly, organize each slide as a structured asset object:

- `slide_id`
- `copy`
- `numbers`
- `refs`
- `figures`
- `charts`
- `icons`
- `image_prompts`
- `layout_intent`

This step is mandatory for dense lecture pages.

### 6. Choose the assembly route

Default route:
- primary: `pptx-tfriedel`
- fallback: `pptx-anthropic`

Use the route after the asset registry is clear, not before.

### 7. Assemble the editable deck

Assembly rules:
- white background by default
- medical blue dominant, brick red / vermilion / orange accents, medical cyan support
- left-image right-text or structured grid where appropriate
- large title bands when the material supports them
- editable numbers, citations, and chart labels
- images must carry information or structure

### 8. Package the external image prompts

Do not assume an integrated image API exists.

Default behavior:
- produce a detailed external prompt package
- English prompt body
- exact Simplified Chinese only when in-image text is truly required
- Word document for cross-platform image generation

### 9. Run QA before delivery

Minimum checks:
- readability
- overlap
- evidence editability
- density quality
- image usefulness
- style consistency

### 10. Deliver the standard package

Default package:
- `01_intake`
- `02_planning`
- `03_prompts`
- `04_delivery`
- editable `.pptx`
- prompt guidance Word file

## Quick human rule

If a new project starts and the workflow is uncertain, do not ask:
"What should I do first?"

Instead, do this:
1. normalize inputs
2. capture style intake
3. build content and visual pipelines
4. create asset registry
5. assemble the editable deck
6. package prompts
