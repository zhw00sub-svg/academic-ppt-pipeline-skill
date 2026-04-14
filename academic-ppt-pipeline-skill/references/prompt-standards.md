# Prompt Standards

## Use image generation only where it helps

Recommended:
- cover
- pathway
- agenda / next-step visual support
- summary anchor

Avoid:
- literature comparison tables
- data-heavy results pages
- evidence ladder pages with specific numbers
- any slide where the image would only decorate instead of carrying structure or information

## Prompt language and text language

- Write the prompt body in English for better model control.
- If the image itself must contain text, explicitly require **Simplified Chinese**.
- When Chinese text is needed, provide the exact Chinese string inside the prompt.
- Keep in-image text minimal. Titles, numbers, and editable labels should still stay in PowerPoint whenever possible.
- If the model cannot render Chinese reliably, remove the text requirement from the image and place the Chinese back into PPT as editable text.

## Color direction

- Default to **white background** as the main contrast field.
- The user's current preference is closer to medical-commercial clarity than earthy beige restraint alone.
- Use deep medical blue as the dominant family.
- Use brick red plus restrained vermilion / orange as the main accent families.
- Use medical cyan / teal as the secondary support family.
- If the user references [NIPPON COLORS](https://nipponcolors.com/), treat that as a palette philosophy source.
- Use the site for concentration, restraint, and color judgment, not as a command to make the deck beige.
- Prefer richer charcoal / medical blue / brick red / medical cyan / restrained orange families over pale cream minimalism when that matches the user's corpus.
- Avoid over-milky beige and washed-out pastel output.
- The image should feel concentrated, clear, and commercially legible rather than sugary or faded.

## Delivery rule

- Do not assume a stable long-term image API is available.
- The default output is a **detailed external prompt package** the user can run across platforms.
- Prompt quality matters because the prompt may become the reusable asset when no API is directly integrated.
- Generated or sourced images should target 4K / ultra-high-definition quality whenever possible.

## Base prompt

```text
Academic editorial illustration for a conference slide, clean white background, deep medical blue dominant palette with brick red and medical cyan support plus restrained orange accents, subtle charcoal structure, flat layered 2D or restrained editorial aesthetic, subtle soft shadow, asymmetrical composition, high-end medical visual language, image should carry structure or information rather than pure decoration, no Chinese text, no English headline, no watermark, no glossy 3D rendering, no dramatic lighting, no human face close-up, no clutter, 4K quality.
```

## Cover prompt

```text
Academic editorial illustration for a medical conference slide cover, clean white background, deep medical blue dominant palette with brick red and medical cyan support plus restrained orange accents, stylized bariatric surgery / chronic disease management theme, journal-cover quality, asymmetrical balance, image should imply long-term management instead of one-off intervention, leave clear title space, no Chinese text, no English headline, no watermark, no glossy 3D rendering, no dramatic lighting, no human face close-up, no clutter, 4K quality.
```

## Pre-op bridge prompt

```text
Academic editorial pathway illustration for a conference slide, clean white background, deep medical blue dominant palette with brick red and medical cyan support plus restrained orange accents, obesity management before bariatric surgery, stylized body silhouette, liver optimization cue, airway or respiratory cue, medicine cue, surgery endpoint cue, these elements connected by a structured clinical pathway, flat layered 2D editorial style, gentle soft shadow, high-end academic look, no text inside image, no Chinese text, no English labels, no watermark, no glossy 3D rendering, no human face close-up, no clutter, 4K quality.
```

## Agenda prompt

```text
Academic editorial pathway-board illustration for a clinical strategy slide, clean white background, deep medical blue dominant palette with brick red and medical cyan support plus restrained orange accents, four structured zones around a central clinical pathway ribbon, subtle document cards, monitoring cue, follow-up cue, research cue, multidisciplinary care cue, flat layered 2D paper-cut style, elegant asymmetrical composition, leave clean empty space for overlaid slide text, no text inside image, no Chinese text, no English labels, no watermark, no glossy 3D rendering, no human figures, no clutter, 4K quality.
```

## Negative prompt

```text
no English headline, no random English text, no poster typography, no watermark, no hospital advertisement style, no purple-blue medical template style, no glossy 3D rendering, no chrome texture, no strong perspective, no dramatic light beam, no human face close-up, no handshake doctor photo, no crowded infographic, no low-resolution artifact, no random symbols, no decorative empty beauty shot without information value.
```

## If the model keeps generating text

- simplify the prompt
- remove all requested labels
- ask only for structure and objects
- put final words, arrows, and node names back into PowerPoint as editable text
