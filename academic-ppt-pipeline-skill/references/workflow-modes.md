# Workflow Modes

## Purpose

This skill must work under both ideal and messy real-world input conditions.

## Mode A: Structured materials

Inputs may include:
- `docx` or `word` outline
- `xlsx` planning workbook
- template `pptx`
- literature `pdf` folder

### Expected behavior

- extract everything first
- treat `xlsx` page structure as the strongest planning source
- use the template to calibrate density and font size
- map literature to pages before building slides

## Mode B: Partial input or topic-only

Inputs may include only:
- a topic
- a title
- an audience
- a time limit
- a vague instruction such as “做一个学术交流PPT”

### Expected behavior

- generate a provisional academic outline first
- separate pages into:
  - evidence-required
  - interpretation / framing
  - placeholder-allowed
- avoid fabricated data
- state internally which pages need later literature fill
- still build a polished editable deck skeleton

## Missing-input downgrade rules

### Missing template PPT

- use the skill's established visual system
- default to large readable fonts and full academic page density
- do not revert to sparse keynote style

### Missing literature PDFs

- generate the structure
- reserve explicit evidence slots
- avoid concrete numeric claims unless supplied by the user

### Missing outline

- create an outline from the topic using standard academic talk logic:
  - why this topic matters
  - current evidence / definitions
  - core clinical scenarios
  - limits and research gaps
  - take-home message

### Missing both template and outline

- still proceed
- prioritize a robust outline and editable skeleton
- mark the deck as needing later evidence enrichment, not redesign

## Core rule

Input quality may downgrade evidence confidence, but it must not downgrade craft ambition.
