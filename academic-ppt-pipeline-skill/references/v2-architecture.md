# V2 Architecture

## Positioning

Version 2 of this skill is no longer a simple “make slides from outline” workflow.
It is an **asset-driven lecture production system** for dense Chinese academic decks.

The key shift is:
- do **not** jump directly from source materials to final slide pages
- first build content assets and visual assets
- index them by slide
- then assemble the final editable `.pptx`

This architecture exists because high-end human lecture pages are not just “pretty”.
They are dense, authored, and filled with effective information:
- text
- numbers
- figures
- paper panels
- charts
- icons
- structured judgment

## High-level flow

```text
Input: brief + raw materials

A. content pipeline
B. visual pipeline

Asset registry
slide_id -> {copy, numbers, refs, figures, charts, icons, prompts, layout_intent}

C. design system pipeline

Output: final editable .pptx deck
```

## A. Content pipeline

### A1. Framework co-creation

- build or confirm the lecture logic
- identify the real thesis, not just the topic
- define the page types and speaking sequence

### A2. Material ingestion

- parse `pdf`, `pptx`, `docx`, `xlsx`
- identify what is evidence-bound
- identify what is speaker interpretation
- identify reusable literature figures, screenshots, or panels

### A3. Content allocation

- map source material to specific slides
- decide what belongs on-screen versus in speaker notes
- assign numbers, papers, figures, and claims to each page

### A4. Copy refinement

- refine logic, tone, and density
- remove slogan-style headings
- increase judgment quality
- preserve evidence accuracy

## B. Visual pipeline

### B1. Extract / process

- extract figures, tables, screenshots, paper panels, charts, and diagrams from source materials
- prefer informative visuals over decorative visuals

### B2. Chart remake

- restyle charts into the user's visual system
- keep numbers editable
- remap colors and hierarchy into the deck's palette

### B3. AI image prompts

- produce detailed external prompts for concept visuals, pathway visuals, and cover anchors
- the skill should **not assume a built-in or stable image API**
- prompt output must be detailed enough for the user to generate images on another platform

### B4. Asset sourcing

- supplement with icons, diagram pieces, or graphical assets when needed
- use external assets only when they strengthen information density

## Asset registry

This is the center of the system.

Before assembly, each slide should have a structured asset pack such as:

```json
{
  "slide_id": "P06",
  "title": "困局之三：术式长期获益并不完全相同",
  "copy": {
    "headline": "...",
    "body": ["...", "..."],
    "takeaway": "..."
  },
  "numbers": [
    {"label": "TWL", "group": "SG", "value": 22.5, "unit": "%"}
  ],
  "refs": ["Biter et al., 2024"],
  "figures": ["paper panel", "screenshot"],
  "charts": ["native comparison chart"],
  "icons": [],
  "image_prompts": [],
  "layout_intent": "left comparison + right judgment"
}
```

The goal is that assembly no longer invents content.
It only arranges already-approved assets.

## C. Design system pipeline

### C1. Color palette studio

- default base is **white background**
- palette should usually be anchored by:
  - deep medical blue as the dominant family
  - brick red as a professional emphasis family
  - medical cyan / teal as the secondary support family
  - orange / amber only as a controlled accent when needed
- use [NIPPON COLORS](https://nipponcolors.com/) as a philosophy source:
  - concentrated
  - restrained
  - clear
  - not sugary
- use white as the contrast field, not creamy beige as the default
- image and chart assets should be prepared with **4K / ultra-high-definition intent** whenever possible, even if the final deck is assembled in standard 16:9 PPT

### C2. Template match

- match the deck to the user's approved lecture architecture
- body-page style should inherit from personal corpus first
- prioritize:
  - left-image right-text layouts
  - structured academic grids
  - large title bands
  - full lower information fields
  - asymmetrical body layouts
  - chart + figure + judgment coexistence
  - large-radius containers used as structural organizers, not repetitive decoration
  - minimal icon language

### C3. Assembly engine

- produce final editable `.pptx`
- keep data, labels, citations, and trial names native
- image generation remains external by default
- images should be inserted only after the prompt package is ready or assets are available

## Default production target

The system should prefer:
- dense academic pages
- informative visuals
- paper presence
- editable numbers
- prompt-first image collaboration

It should avoid:
- empty elegance
- decorative but hollow visuals
- giant numbers with weak evidence field
- images used only for beauty rather than information

## Keynote vs PPT

This architecture is presentation-format agnostic at the asset layer.

- `pptx` is currently the most practical assembly target for automation
- Keynote remains a strong visual reference and manual refinement destination
- if a future Keynote route exists, it should reuse the same asset registry rather than fork the whole workflow
