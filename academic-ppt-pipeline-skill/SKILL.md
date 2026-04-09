---
name: academic-ppt-pipeline
description: Build editable Chinese academic PowerPoint decks from outline spreadsheets, reference templates, and literature PDFs, while coordinating external image-generation prompts for cover/pathway visuals. Use when the task requires a conference-ready PPT with large readable fonts, text-heavy academic layouts, literature-backed pages, prompt standards for image generation, or a repeatable SOP for PPT plus image workflow.
---

# Academic PPT Pipeline

This skill is the orchestration layer above the existing PPT skills and image workflow.

Use this skill when the user wants an academic or medical presentation that must be:
- editable `.pptx`, not image-only
- based on a planning spreadsheet, template PPT, and literature PDFs
- visually close to an approved reference style
- supported by image-generation prompts for a few key slides
- delivered with a repeatable SOP and QA standard

The long-term goal is not a one-off deck. The goal is a **custom PPT skill** that can repeatedly:
- accept complete or incomplete inputs
- clarify key choices through guided conversation
- choose the PPT production route
- generate an editable deck
- package prompt assets for image generation
- continue until final PPT delivery

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

Use a short guided intake:
- ask one focused question at a time
- provide option-style choices where tradeoffs exist
- recommend one option when reasonable
- stop asking once the path is clear enough
- then continue automatically until PPT delivery

Read [references/guided-intake.md](references/guided-intake.md).

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

## Workflow

1. Run guided intake first if the path is not yet clear.
2. Extract or normalize inputs.
   - accept `word` or `xlsx` as the lecture outline
   - accept optional template `.pptx`
   - accept literature `.pdf` folder or single pdf
   - use `scripts/extract_academic_ppt_inputs.js` to create a machine-readable summary before planning slides
3. Identify page types before building:
   - cover / opener
   - text-heavy interpretation page
   - literature map / comparison page
   - data page
   - pathway page
   - summary page
4. Keep evidence-heavy slides native inside PowerPoint.
   - comparisons, tables, meta-analysis numbers, RCT data, and literature references should stay editable
   - use real paper thumbnails or screenshots when helpful
5. Use image generation only on the right kinds of pages.
   - good: cover, pathway, agenda, summary anchor visual
   - avoid: data-heavy pages, comparison tables, evidence ladder pages with numbers
6. Choose the PPT production route.
   - default: `pptx-tfriedel`
   - fallback: `pptx-anthropic`
7. Build the PPT in editable shapes and text boxes first.
8. Add image prompts as a companion asset, not as a substitute for the PPT.
9. Run QA before delivery.

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
- Use asymmetrical academic layouts when appropriate:
  - left dense text + right image
  - right dense text + left literature figure
  - stacked cards plus literature strip
- One slide can be text-heavy if the template supports it.
- Do not shrink text just to preserve decorative spacing.
- Default toward the target standard, not the minimum gate.

Read [references/ppt-standards.md](references/ppt-standards.md) for the detailed layout and QA rules.

## Image-generation standard

Image generation should support the slide, not dominate it.

- Match the approved visual direction:
  - white background
  - flat layered 2D look
  - subtle soft shadow
  - navy / teal / warm sand palette
  - no random text in image
- Generate images with safe blank areas for slide text.
- If the model keeps inserting text or fake labels, stop using image generation on that slide and switch to native PPT layout with literature screenshots.

Read [references/prompt-standards.md](references/prompt-standards.md) for prompt templates and negative prompts.

## Deliverables

When the user asks for a full package, default to:
- editable `.pptx`
- image prompt guidance document
- extraction artifact when raw inputs exist
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
- If inputs are incomplete, downgrade evidence certainty when needed, but do not downgrade craft ambition.
- Treat the repo version of this skill as the maintainable product surface.
