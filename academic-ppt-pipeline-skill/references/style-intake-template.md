# Style Intake Template

Use this file as the front-loaded style prompt box before a new PPT project starts.

The purpose is not to describe everything.
The purpose is to define only the visual choices that materially change the deck.

If this file is filled for a project, it should override the default personal style corpus for that run unless the user explicitly chooses `merge`.

## Recommended modes

- `override`
  - this project should follow the custom style brief first
- `merge`
  - combine this brief with the personal style corpus
- `fallback`
  - no custom brief; use the personal style corpus or the skill default

## Fill-in template

```text
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

## Operational rule

When this template is filled:

1. resolve the style mode
2. lock the style source for this run
3. apply it before content-to-slide assembly begins
4. do not quietly fall back to the default personal style unless the custom brief leaves that area unspecified
