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

## Prompt language and text language

- Write the prompt body in English for better model control.
- If the image itself must contain text, explicitly require **Simplified Chinese**.
- When Chinese text is needed, provide the exact Chinese string inside the prompt.
- Keep in-image text minimal. Titles, numbers, and editable labels should still stay in PowerPoint whenever possible.
- If the model cannot render Chinese reliably, remove the text requirement from the image and place the Chinese back into PPT as editable text.

## Color direction

- If the user references [NIPPON COLORS](https://nipponcolors.com/), treat that as a palette philosophy source.
- Prefer richer charcoal / tea / khaki / muted vermilion families over pale cream minimalism when that matches the user's corpus.
- Avoid over-milky beige and washed-out pastel output.
- The image should feel concentrated and clear, not sugary or faded.

## Base prompt

```text
Academic editorial illustration for a conference slide, clean white background, deep navy + teal + warm sand palette, flat layered 2D paper-cut aesthetic, subtle soft shadow, asymmetrical composition, high-end medical journal visual language, leave clean negative space for slide text, elegant clinical pathway atmosphere, no chinese text, no english headline, no watermark, no glossy 3D rendering, no dramatic lighting, no human face close-up, no clutter.
```

## Cover prompt

```text
Academic editorial illustration for a medical conference slide cover, clean white background, deep navy + teal + warm sand palette, stylized bariatric surgery instrument silhouette on the left, slim obesity pharmacotherapy pen on the right, a graceful clinical pathway curve connecting surgery to medication and long-term follow-up, tiny abstract metabolic icons along the curve, flat layered 2D paper-cut aesthetic, subtle soft shadow, elegant asymmetrical balance, journal-cover quality, leave negative space around the pathway, no chinese text, no english headline, no watermark, no glossy 3D rendering, no dramatic lighting, no human face close-up, no clutter.
```

## Pre-op bridge prompt

```text
Academic editorial pathway illustration for a conference slide, clean white background, deep navy + teal + warm sand palette, obesity management before bariatric surgery, stylized obese body silhouette, liver optimization cue, airway or respiratory cue, medicine pen cue, surgery endpoint cue, these elements connected by a smooth clinical bridge pathway, flat layered 2D paper-cut style, gentle soft shadow, structured left-to-right logic, high-end academic look, no text inside image, no chinese text, no english labels, no watermark, no glossy 3D rendering, no human face close-up, no clutter.
```

## Agenda prompt

```text
Academic editorial pathway-board illustration for a clinical strategy slide, clean white background, deep navy + teal + warm sand palette, four structured zones around a central clinical pathway ribbon, subtle document cards, monitoring cue, follow-up cue, research cue, multidisciplinary care cue, flat layered 2D paper-cut style, elegant asymmetrical composition, leave clean empty space for overlaid slide text, no text inside image, no chinese text, no english labels, no watermark, no glossy 3D rendering, no human figures, no clutter.
```

## Negative prompt

```text
no english headline, no random english text, no poster typography, no watermark, no hospital advertisement style, no purple-blue medical template style, no glossy 3D rendering, no chrome texture, no strong perspective, no dramatic light beam, no human face close-up, no handshake doctor photo, no crowded infographic, no low-resolution artifact, no random symbols.
```

## If the model keeps generating text

- simplify the prompt
- remove all requested labels
- ask only for structure and objects
- put final words, arrows, and node names back into PowerPoint as editable text
