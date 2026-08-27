# ABS Bootcamp Checkpoint

**Date:** 2026-08-28
**Implementation baseline:** `9655f33 fix: auto scroll active robot flow step`
**Checkpoint commit:** `1ddd6e7 docs: record project checkpoint`

## Current artifact
The project contains a static React + TypeScript + Vite website for the unplugged “แดน 3 ธรรม” activity:

- Knowledge view for Dhamma, nature, and culture learning cards.
- Mission view with a no-repeat random draw across 20 missions.
- Board-placement example popup using `data/พื้นที่เกม.png` and supplied asset images.
- Full-screen robot demonstration with animated movement, live command text, completed-step indicators, and an auto-scrolling side flow.
- Local Mali font files under `src/assets/fonts/`.

## Verification
- Tests: `npm test` — PASS (2 files, 4 tests).
- Production build: `npm run build` — PASS.
- Git status: clean at the time of checkpoint creation.
- Dev server: stopped; no listener remains on port 5173.

## Known follow-ups
- Three.js/R3F produces a large lazy-loaded chunk; optimize only if classroom-device testing shows a problem.
- Review modal focus management and add browser-level interaction coverage before release.
- Resolve remaining content-owner choices in `CONTENT_AUDIT.md` (missing landmark images and preferred indigo image).

## Resume command
```bash
cd "/Users/kanokkarn/Data/AI Title/projects/abs-bootcamp"
npm run dev
```
