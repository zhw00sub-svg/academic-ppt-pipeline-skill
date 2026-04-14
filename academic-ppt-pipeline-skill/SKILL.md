---
name: academic-ppt-pipeline
description: Build editable Chinese academic PowerPoint decks from outline spreadsheets, reference templates, and literature PDFs, while coordinating external image-generation prompts for cover/pathway visuals. Use when the task requires a conference-ready PPT with large readable fonts, text-heavy academic layouts, literature-backed pages, prompt standards for image generation, or a repeatable SOP for PPT plus image workflow.
---

# Academic PPT Pipeline

This skill is the orchestration layer above the existing PPT skills and image workflow.
This skill must not assume one permanently fixed visual style.
The default personal style corpus is only the fallback, not the locked output style for every project.

Use this skill when the user wants an academic or medical presentation that must be:
- editable `.pptx`, not image-only
- based on a planning spreadsheet, template PPT, and literature PDFs
- visually close to an approved reference style
- optionally anchored to a personal style corpus from the user's own `pdf + pptx` decks
- supported by image-generation prompts for a few key slides
- delivered with a repeatable SOP and QA standard

The long-term goal is not a one-off deck. The goal is a **custom PPT skill** that can repeatedly:
- accept complete or incomplete inputs
- clarify key choices through guided conversation
- choose the PPT production route
- generate an editable deck
- package prompt assets for image generation
- continue until final PPT delivery

The current target architecture is **v2 asset-driven production**:
- content pipeline
- visual pipeline
- asset registry indexed by slide
- design-system-based assembly into editable `.pptx`

Read [references/v2-architecture.md](references/v2-architecture.md).

## Tool routing

When PPT production begins:
- preferred PPT skill: `pptx-tfriedel`
- fallback PPT skill: `pptx-anthropic`

This orchestration skill owns the routing decision.
The user should experience one workflow, not two separate tools.

Read [references/tool-routing.md](references/tool-routing.md).

## Guided conversation mode

At the beginning of a new deck, do not jump straight into production unless the requirements are already clear.

If the user's requirements are already explicit enough, skip guided intake and execute directly.

Before automation starts, prefer one front-loaded **style intake** instead of many small aesthetic questions.
This should behave like a custom style prompt box:
- if the user supplies a project-specific style brief, use it first
- if the user leaves style blank, fall back to the user's personal style corpus
- if neither exists, use the skill default visual system
- do not lock every future deck to the same historical style

Use a short guided intake:
- ask one focused question at a time
- provide option-style choices where tradeoffs exist
- recommend one option when reasonable
- stop asking once the path is clear enough
- then continue automatically until PPT delivery

Read [references/guided-intake.md](references/guided-intake.md).
For the style prefill structure, read [references/style-intake-template.md](references/style-intake-template.md).

## Two input modes

### Mode A: Structured materials

Use when the user provides some or all of:
- `word/docx` outline
- `xlsx` planning workbook
- reference `pptx`
- literature `pdf` folder

### Mode B: Topic-only or partial-input mode

Use when the user gives only:
- a topic
- a rough title
- a speaking task
- partial materials

In this mode, still move forward:
- generate a provisional academic outline
- separate evidence-bound pages from structural pages
- avoid fabricated data
- keep visual ambition high even if evidence inputs are incomplete

Read [references/workflow-modes.md](references/workflow-modes.md).
For the standard startup sequence of each new deck, read [references/project-startup-flow.md](references/project-startup-flow.md).

## Workflow

The v2 workflow should not jump directly from source materials to finished pages.
It should move through these layers:

0. Style intake
   - capture project-specific visual intent before the workflow locks into a style
   - treat the style intake as a front-loaded override / merge / fallback decision
   - precedence should be:
     - project-specific style intake
     - personal style corpus
     - skill default visual system
   - style intake may define:
     - palette direction
     - density target
     - image realism level
     - title-band preference
     - preferred page grammar
     - anti-patterns for this specific deck
1. Intake and normalization
   - accept `word` or `xlsx` as the lecture outline
   - accept optional template `.pptx`
   - accept literature `.pdf` folder or single pdf
   - if the user provides personal style `pdf/pptx` references, analyze those before choosing the visual system
   - use `scripts/extract_academic_ppt_inputs.js` to create a machine-readable summary before planning slides
2. Content pipeline
   - framework co-creation
   - material ingestion
   - content allocation
   - copy refinement
3. Visual pipeline
   - extract or process figures, tables, screenshots, paper panels, and charts
   - remake charts into the selected visual system
   - generate external image prompts for concept / cover / pathway visuals
   - source icons or graphics only when they increase information density
4. Asset registry
   - organize each slide into `copy`, `numbers`, `refs`, `figures`, `charts`, `icons`, `image_prompts`, and `layout_intent`
   - do not let final assembly invent content that should have been prepared earlier
5. Assembly
   - identify page types before building:
     - cover / opener
     - text-heavy interpretation page
     - literature map / comparison page
     - data page
     - pathway page
     - summary page
   - keep evidence-heavy slides native inside PowerPoint
   - use real paper thumbnails, screenshots, or remade charts when helpful
   - use image generation only on the right kinds of pages
   - choose the PPT production route:
     - default: `pptx-tfriedel`
     - fallback: `pptx-anthropic`
   - build the PPT in editable shapes and text boxes first
6. QA and delivery
   - add image prompts as a companion asset, not as a substitute for the PPT
   - run QA before delivery

## Input extraction

Use the bundled script:

```bash
node academic-ppt-pipeline-skill/scripts/extract_academic_ppt_inputs.js \
  --outline "/path/to/outline.xlsx" \
  --template "/path/to/template.pptx" \
  --literature "/path/to/literature-folder" \
  --output "/path/to/output/input_extract"
```

What it does:
- `word/docx`: extracts plain text paragraphs
- `xlsx`: extracts sheet names and slide-by-slide rows from the main planning sheet
- `pptx`: extracts slide text summaries from the template
- `pdf`: collects ordered literature filenames as the first-pass evidence map

Use this extraction output as the planning source of truth for step one.

For actual workflow language and repeated execution, use the fixed prompts in:
- [references/fixed-prompts.md](references/fixed-prompts.md)
- [references/update-workflow.md](references/update-workflow.md)

## Delivery bar

Use two thresholds:

- `最低过线`: editable, readable, no obvious overlap, style roughly aligned
- `目标交付`: conference-ready, fuller page architecture, stronger image-text coordination, fewer manual fixes needed

The current accepted deck is only the minimum gate. It is not the target finish line.

- Fonts must be readable at conference distance.
- Prefer larger Chinese text over elegant but undersized layouts.
- Avoid sparse keynote-style empty pages.
- Default to white as the main contrast field unless a specific project demands otherwise.
- If the approved reference uses a wide top banner and a full lower information field, follow that architecture.
- If the user has a personal style corpus, that corpus outranks generic academic aesthetics.
- Use asymmetrical academic layouts when appropriate:
  - left dense text + right image
  - right dense text + left literature figure
  - stacked cards plus literature strip
-   strong title band + dense lower diagrams/cards
- One slide can be text-heavy if the template supports it.
- Images must carry information or structure, not just decoration.
- Do not shrink text just to preserve decorative spacing.
- Default toward the target standard, not the minimum gate.
- If a project-specific style intake conflicts with the default personal style corpus, the project-specific style intake wins for that run.

Read [references/ppt-standards.md](references/ppt-standards.md) for the detailed layout and QA rules.
For the current user's personalized正文页风格, also read [references/zhw-personal-style.md](references/zhw-personal-style.md).

## Image-generation standard

Image generation should support the slide, not dominate it.

- Match the approved visual direction:
  - white background
  - flat layered 2D look or restrained editorial image language
  - subtle soft shadow
  - medical blue as the dominant family
  - restrained red / vermilion / orange accents
  - use [NIPPON COLORS](https://nipponcolors.com/) as a palette philosophy source, not as a beige-only recipe
  - no random text in image
- Generate images with safe blank areas for slide text.
- Do not assume a stable built-in or free long-term image API is available.
- The default image workflow is **prompt-first external generation**.
- If the model keeps inserting text or fake labels, stop using image generation on that slide and switch to native PPT layout with literature screenshots.

Read [references/prompt-standards.md](references/prompt-standards.md) for prompt templates and negative prompts.

## Deliverables

When the user asks for a full package, default to:
- editable `.pptx`
- image prompt guidance document
- if images are meant for external tools such as NanoBanana, package them as a standalone Word document with slide-by-slide prompts
- extraction artifact when raw inputs exist
- asset or planning artifacts when the project follows the v2 architecture
- optional local skill or SOP bundle if the user wants the workflow automated

The standard run package should be organized into:
- `01_intake`
- `02_planning`
- `03_prompts`
- `04_delivery`

## Operating principle

This skill should behave like a guided production system:
- clarify only the choices that matter
- lock assumptions quickly
- choose the production path
- continue automatically
- stop only when the editable PPT and companion assets are delivered

## QA checklist

- No obvious overlap between text, lines, shapes, and images.
- Title and body sizes remain readable after slide-level density increases.
- Real data and citations stay editable.
- Image pages visually match the approved reference direction.
- Text-heavy pages feel full and intentional, not empty.

## Notes

- If a user says a specific generated image is the standard, use that image as the visual benchmark for future prompts.
- If the template shows large fonts and full-page content blocks, follow that instead of generic product-keynote aesthetics.
- If a PDF reference shows a keynote-grade title band and fuller page occupation, mirror its page architecture while preserving academic density.
- If the user provides their own historical decks, treat those decks as the highest-priority style truth for body-page design.
- If inputs are incomplete, downgrade evidence certainty when needed, but do not downgrade craft ambition.
- Treat the repo version of this skill as the maintainable product surface.
