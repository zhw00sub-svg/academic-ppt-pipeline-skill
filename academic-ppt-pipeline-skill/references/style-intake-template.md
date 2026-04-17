# Style Intake Template

Use this file as the front-loaded style prompt box before a new PPT project starts.

The purpose is not to describe everything.
The purpose is to define only the visual choices that materially change the deck.

If this file is filled for a project, it should override the default personal style corpus for that run unless the user explicitly chooses `merge`.

## Startup choices

Before the workflow continues, the skill should let the user choose one of three startup style sources:

- `preset1`
  - the current integrated strong-contrast style derived from the user's existing corpus
- `preset2`
  - the lighter, calmer medical evidence-summary palette
- `custom`
  - a manually written project-specific style brief

User-facing labels should be shown in Chinese:

- `强对比浓重风`
  - internal key: `preset1`
- `轻快医学信息风`
  - internal key: `preset2`
- `自定义风格`
  - internal key: `custom`

These are not the same thing as `override / merge / fallback`.

- startup choice answers: which style source do we start from
- style mode answers: how should that source interact with the personal style corpus

## Recommended modes

- `override`
  - this project should follow the custom style brief first
- `merge`
  - combine this brief with the personal style corpus
- `fallback`
  - no custom brief; use the personal style corpus or the skill default

## Fill-in template

```text
Startup style choice:
- preset1 / preset2 / custom

Style mode:
- override / merge / fallback

Project visual goal:
- what should this deck feel like in one sentence?

Palette direction:
- white background or other
- dominant color family
- accent color family
- contrast level

Density target:
- sparse / medium / dense / very dense

Title system:
- strong top banner / lighter title strip / no banner

Preferred page grammar:
- left-image right-text
- right-image left-text
- structured grid
- paper strip + judgment block
- comparison matrix
- timeline

Image strategy:
- use external image prompts only on key pages
- prefer literature screenshots / paper panels
- avoid AI images on evidence pages
- realism level: flat / editorial / restrained realistic

Anti-patterns for this project:
- what should definitely not appear?

Relation to historical personal style:
- stay close / partially deviate / intentionally different

Special notes:
- any one-off event requirement for this deck
```

## Preset 1

Use when the deck should stay closer to the user's currently integrated body-page style.

- white background
- stronger contrast
- deeper medical blue as the main family
- restrained brick red / orange / cyan accents
- conference lecture density
- strong title band
- denser lower information field
- suitable for high-information lecture pages that still need clear separation

## Preset 2

Use when the deck should feel calmer, lighter, and more publication-summary-like.

- overall mood: calm, evidence-based, scholarly, modern, trustworthy
- predominantly white and misty off-white background
- structured information blocks
- thin grey dividers
- subtle grid alignment
- highly organized layout for medical data presentation
- soft powder blue, pale clinical sky blue, mint green, teal-green
- cool neutral greys for comparison groups, tables, borders, grids, and secondary content
- deep charcoal for titles and text
- lighter-weight Chinese typography in dark grey instead of heavy pure-black headings
- one restrained muted medical orange accent only
- elegant, structured, serious, information-dense

Suggested colors:

- `#FEFEFC`
- `#EDF6FC`
- `#B2D4ED`
- `#5C9AD0`
- `#BFE6D7`
- `#63BFA8`
- `#D1DBDA`
- `#AFB7B9`
- `#707978`
- `#141516`
- Accent orange: `#E59A5A`

Avoid:

- neon colours
- bright red
- fluorescent green
- candy colours
- glossy effects
- noisy backgrounds
- commercial healthcare advertising style
- cartoonish icons
- playful illustration
- social-media-style exaggeration
- oversaturated gradients

## Operational rule

When this template is filled:

1. resolve the style mode
2. lock the style source for this run
3. apply it before content-to-slide assembly begins
4. do not quietly fall back to the default personal style unless the custom brief leaves that area unspecified
