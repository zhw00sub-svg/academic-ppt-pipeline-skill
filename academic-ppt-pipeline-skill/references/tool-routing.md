# Tool Routing

## Role of this skill

This custom skill is the controller.
It decides which PPT skill to use and when to switch.

## Default routing

### Primary

- `pptx-tfriedel`

Use first for:
- editable deck generation
- structured slide composition
- native text boxes, cards, shapes, and layout work

### Fallback

- `pptx-anthropic`

Switch when:
- the preferred route cannot maintain layout fidelity
- editability is compromised
- slide structure becomes unstable
- the deck needs a different generation path to reach target-delivery standard

## Rule

The end user should experience one workflow, not two competing skills.

The orchestration skill must:
- choose the initial route
- detect when quality is not sufficient
- switch tools without resetting the project logic

## Quality triggers for fallback

Fallback should be considered if the current route causes:
- unreadably small fonts
- repeated overlap
- sparse or non-academic layout drift
- image-heavy slides with weak editable structure
- failure to meet target-delivery standard
