## Project UI Standards

For any frontend change in this portfolio, follow the installed `frontend-design` and `web-design-guidelines` skills by default.

### Design-System Rules

- Treat `src/app/globals.css` as the source of truth for typography, surface, layout, focus, and reusable UI classes.
- Do not add ad hoc `text-*`, `font-*`, `leading-*`, or `tracking-*` classes in TSX unless the value is a one-off visual exception and a semantic class would be worse.
- Prefer existing semantic classes such as `type-*`, `surface-*`, `layout-*`, `media-frame`, `ui-button`, `ui-pill`, and `focus-ring`.
- If a new text style is needed, add a named `type-*` class in `globals.css` first, then consume it from components.
- Keep component APIs small and variant-based where repeated visual choices exist, for example label variants instead of manually composing classes at each callsite.
- Match button and link labels to Title Case unless content intentionally uses sentence copy.
- Keep cards at `8px` radius unless the existing system explicitly uses a named radius token for that surface.

### Accessibility & Interaction Rules

- Links use `next/link` for navigation and anchors only for true hash or external navigation.
- Buttons are used for actions, with `type="button"` where appropriate.
- Icon-only buttons need `aria-label`; decorative icons need `aria-hidden="true"`.
- Every interactive element needs a visible `focus-visible` state, preferably through `focus-ring`.
- Avoid `outline-none` unless the same class includes a visible focus replacement.
- Avoid `transition-all`; list transitioned properties explicitly.
- Respect reduced motion for new animations.

### Text & Content Rules

- Use `…` instead of `...`.
- Use `text-wrap: balance` or `text-wrap: pretty` through shared type classes for headings and long body copy.
- Use `font-variant-numeric: tabular-nums` for metrics and comparable numbers.
- Text containers that may receive long content need truncation, wrapping, or `min-w-0` where flex/grid can squeeze them.

### Required Checks

Before finishing frontend work, run:

```bash
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

If a dev server is started, verify key pages load locally and check for server/browser errors.
