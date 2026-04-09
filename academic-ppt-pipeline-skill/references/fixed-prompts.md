# Fixed Prompts

These prompts are the stable backbone of the skill. Reuse them instead of re-inventing the workflow every time.

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
- risks caused by missing inputs

Do not write slide copy yet. Do not fabricate data.
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
- keep evidence-heavy content native inside PowerPoint
- use image assets only where they strengthen the page

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
- use navy / teal / warm sand palette
- prefer flat layered 2D editorial style
- leave clean negative space for editable slide text
- avoid all generated text inside the image

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
- extraction artifact if raw materials existed

If the workflow is being productized into a reusable skill:
- update the fixed prompts
- update fallback rules
- preserve the current visual and quality standards
```
