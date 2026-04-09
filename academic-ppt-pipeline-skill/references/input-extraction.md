# Input Extraction

## Goal

Normalize the user's raw materials into one planning summary before any slide design begins.

## Accepted inputs

- `word` or `docx` lecture outline
- `xlsx` planning workbook
- optional template `pptx`
- literature `pdf` folder or single file

## Extraction priority

1. `xlsx` if the workbook is already slide-structured
2. `word/docx` if the outline is narrative
3. template `pptx` for density and title-size reference
4. literature `pdf` list for evidence mapping

## Expected output

The extraction step should produce:
- a `.json` file for automation
- a `.md` file for human review

Both should summarize:
- detected slide count or outline blocks
- page titles or paragraph blocks
- evidence references if present
- available image-prompt fields
- template slide text summary
- literature filename list

## Notes

- PDF text extraction is not required for the first pass.
- For first-pass planning, ordered PDF filenames are enough to build the evidence map.
- Deeper figure or text extraction can happen later when creating data slides.
