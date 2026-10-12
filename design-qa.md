# Mobile design QA

- Source visual truth: `/Users/kirill/Downloads/Пространство красоты.png`
- Implementation screenshot: `/Users/kirill/Desktop/Разработка/Milos/implementation-mobile-375x991.png`
- Viewport: 375 × 991 CSS px
- Source pixels: 375 × 991
- Implementation pixels: 375 × 991
- Density normalization: both images compared at 1×; Chrome device scale factor 1
- State: initial hero after entrance animations completed

## Full-view comparison evidence

The reference and implementation were opened together at their original pixel dimensions. The final implementation matches the reference's mobile information hierarchy and vertical composition: centered brand and address, full-bleed treatment photo, offer block, four-line display heading, full-width pill CTA, and bottom expert card.

## Focused region comparison evidence

The 375 px source is fully legible at original size, so separate crops were not needed. Focused checks were performed directly on the combined original-resolution view:

- Header: brand and two-line address align centrally with matching top spacing.
- Hero copy: offer begins at the same vertical zone and retains the intended three-line wrap.
- Heading: final four-line wrapping, left alignment, line height, and width match the reference structure.
- CTA and expert card: horizontal margins, height, radius, image slot, copy wrapping, and baseline positions match the reference.

## Findings

- [P3] Minor photographic variation
  - Location: mobile hero background.
  - Evidence: the generated mobile asset uses the same subject, pose, warm spa palette, and vertical composition, but the face crop and towel tones vary slightly from the reference photograph.
  - Impact: no layout or usability impact; visual intent remains consistent.
  - Follow-up: replace `dist/assets/mobile-hero-background-v2.png` with the exact clean source asset if an original file becomes available.

## Interaction and runtime checks

- Primary CTA opens the dialog.
- Dialog changes `aria-hidden` to `false`.
- Close button receives focus after opening.
- Browser console errors on the final run: none.

## Comparison history

1. Initial capture used the macOS headless Chrome minimum CSS width of 500 px despite a 375 px output file, so it was rejected as invalid evidence.
2. First normalized 375 × 991 capture found a P1 title mismatch: six lines instead of four, shifting the offer upward by approximately 68 px. Fixed with mobile-only line control and a 25 px display size.
3. Second normalized capture found a P2 typography mismatch: the heading was approximately 5% smaller than the reference. Fixed by increasing it to 26 px and tightening letter spacing.
4. Final normalized capture confirmed the four-line title, vertical rhythm, CTA, card geometry, content wrapping, interaction state, and error-free console.

## Implementation checklist

- [x] Dedicated portrait mobile background asset
- [x] Desktop layout unchanged
- [x] Mobile navigation hidden to match the reference
- [x] Mobile header spacing matched
- [x] Offer, heading, CTA, and expert card positioned to the 375 × 991 reference
- [x] Motion and reduced-motion behavior preserved
- [x] CTA interaction and focus behavior verified

## Follow-up polish

- Use the exact original portrait photograph if supplied as a standalone file.

final result: passed
