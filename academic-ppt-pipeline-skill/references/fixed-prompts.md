# Fixed Prompts

These prompts are the stable backbone of the skill. Reuse them instead of re-inventing the workflow every time.

## V2 production note

The workflow is now asset-driven:
- content pipeline
- visual pipeline
- asset registry by slide
- design-system assembly

Do not jump directly from raw materials to final page rendering when the project requires high information density.

## 0. Guided intake prompt

Use at the beginning of a new project.

```text
You are guiding the user into a custom academic PPT workflow.
Ask one focused choice at a time.
Prefer 2-4 concrete options.
Recommend one option when possible.
Collect only the choices that change the workflow:
- input mode
- output target
- visual anchor
- evidence strictness
- image-generation usage

After enough is known, stop asking and summarize the chosen path in 3-5 lines, then continue automatically.
```

## 1. Intake normalization prompt

Use after reading the extracted inputs.

```text
You are normalizing source materials for a Chinese academic PowerPoint project.
Your task is to identify:
1. what materials are present
2. what is missing
3. what can be treated as source-of-truth
4. what must be inferred later

Return:
- input status
- preferred planning source
- slide count if available
- evidence availability by page
- template style cues if available
- personal style corpus cues if the user supplied historical `pdf/pptx` decks
- risks caused by missing inputs

Do not write slide copy yet. Do not fabricate data.
```

## 1B. Asset registry planning prompt

Use after outline direction is stable and before final assembly.

```text
You are converting an academic PPT plan into a slide-level asset registry.

For each slide, return:
- slide_id
- page goal
- copy blocks
- numbers / tables / chart requirements
- literature references
- figure or screenshot candidates
- external image prompt need or no-image decision
- icon or graphic needs
- layout intent

The goal is to make assembly deterministic.
Do not let the final PPT step invent missing content.
```

## 1A. Personal style extraction prompt

Use when the user provides their own historical `pdf` / `pptx` decks and wants future decks to look like them.

```text
You are extracting a personal presentation style profile from the user's own historical body-page decks.

Focus on:
- title architecture
- page density
- left-right asymmetry
- chart and literature placement
- recurring judgment zones
- color concentration and palette direction
- what makes the pages feel human rather than generic
- what visual habits should be avoided

Return:
- core style summary
- recurring page motifs
- palette guidance
- typography guidance
- anti-patterns
- operational rules that future decks must follow

Prioritize the user's own decks over generic design conventions.
```

## 2. Outline synthesis prompt for structured materials

Use when `xlsx/docx + template + literature` exist or mostly exist.

```text
You are planning a Chinese academic conference PowerPoint.
Based on the extracted workbook / outline / template / literature map, generate a slide-by-slide outline.

For each slide, provide:
- page goal
- screen text direction
- speaker-note direction
- recommended layout
- whether image generation is appropriate
- whether a native table/chart is required
- literature dependency level

Requirements:
- keep titles academic and specific
- no slogan-style headings
- do not turn data pages into decorative pages
- maintain large readable Chinese typography
- prefer text-heavy half-screen layouts where the material supports it
- prefer left-image right-text or structured academic grid layouts when the content supports it
- prefer a strong title band or judgment band when the reference style supports it
- make the page feel full and editorial, not sparse and product-keynote-like
- maximize effective information density rather than elegant emptiness
- specify when figures, paper panels, screenshots, or remade charts should appear on the page
- if the user has a personal style corpus, inherit its body-page grammar before using any default visual system
- identify which claims must stay evidence-bound
```

## 3. Outline synthesis prompt for topic-only mode

Use when only a topic or partial instruction exists.

```text
You are planning a Chinese academic conference PowerPoint from a topic only.
Generate a provisional outline that is credible for academic use, while clearly separating:
- evidence-required pages
- framing / interpretation pages
- placeholder-allowed pages

For each slide, provide:
- provisional title
- page goal
- recommended layout
- what evidence would later be needed
- what can remain structural for now

Constraints:
- do not fabricate statistics
- do not claim literature support that has not been supplied
- still design the outline as a full, serious academic talk rather than a thin placeholder deck
```

## 4. Slide production prompt

Use once the outline is confirmed.

```text
You are producing an editable Chinese academic PowerPoint.
The deck must meet target-delivery standard:
- most pages should need only light user edits
- fonts must remain conference-readable
- pages may be dense if the content requires density
- use asymmetrical academic layouts, not sparse product-keynote layouts
- when appropriate, use a large top title band with a dense lower information field
- allow left-half or right-half text-heavy pages if that matches the approved reference
- if the user's historical decks use stronger, more concentrated colors, do not wash the page into pale cream minimalism
- default to white background with medical blue dominant color logic and restrained red / orange emphasis when no stronger project-specific palette overrides it
- use large-radius containers only when they help organize dense information
- keep icons minimal and clinical
- keep evidence-heavy content native inside PowerPoint
- use image assets only where they strengthen the page
- images must carry structure or information, not only decoration

Assume the orchestration layer has already selected the PPT production route:
- primary route: pptx-tfriedel
- fallback route: pptx-anthropic

For each slide, decide:
- text block size
- figure or literature strip placement
- native shapes vs external image
- citation position
- whether the slide is already target-delivery or still only minimum-pass
```

## 5. Image collaboration prompt

Use to derive image prompts for NanoBanana or other external APIs.

```text
Generate slide-specific image prompts that visually match the approved benchmark image.
The prompts must:
- preserve white background
- use medical blue as the dominant family
- use brick red plus restrained vermilion / orange accents
- use medical cyan / teal as a support family
- use NIPPON COLORS as a philosophy source for concentration and restraint, not as a beige-only rule
- prefer flat layered 2D editorial style
- leave clean negative space for editable slide text
- use English prompt wording for model control
- if the image must contain visible words, require exact Simplified Chinese strings
- avoid unnecessary generated text inside the image
- be detailed enough that the user can generate the image on another platform without a direct integrated API
- target 4K / ultra-high-definition quality whenever possible

Also return:
- negative prompt
- ideal aspect ratio
- recommended placement in slide
- whether the slide should fall back to native PPT layout if the image model inserts text
```

## 6. QA prompt

Use before final delivery.

```text
Review the deck against target-delivery standard.
Check:
- text readability
- overlap between text, shapes, and images
- whether dense pages still feel intentional
- whether image and typography belong to one system
- whether any slide fell back to generic template behavior
- whether evidence-heavy pages remain editable

Classify each slide:
- target-delivery
- minimum-pass only
- needs revision
```

## 7. Final output prompt

Use when packaging the project.

```text
Prepare the final output package for a Chinese academic PPT project.
Default package:
- editable PPT
- external image prompt guide
- external-image Word guide when the images are meant to be generated in NanoBanana or another outside tool
- extraction artifact if raw materials existed

If the workflow is being productized into a reusable skill:
- update the fixed prompts
- update fallback rules
- preserve the current visual and quality standards
```
