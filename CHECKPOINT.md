# ABS Bootcamp Checkpoint

**Date:** 2026-08-28
**Implementation baseline:** `a1a5b8a feat: add robot command card flow`
**Checkpoint commit:** current commit; see `git log -1 --oneline`

## Current artifact
The project contains a static React + TypeScript + Vite website for the unplugged “แดน 3 ธรรม” activity:

- Knowledge view for Dhamma, nature, and culture learning cards.
- Mission view with a no-repeat random draw across 20 missions.
- Board-placement example popup using the same board, marker sizing, mission example, and coordinate positions as the robot demonstration.
- Robot demonstration popup with manual step controls, play-auto control, pause, stop, reset, slow default speed, destination coordinates in each command, and no auto-start until Play is pressed.
- Updated nature assets for `น้ำตกคำน้ำสร้าง`, `อุทยานแห่งชาติภูพาน`, and `อุทยานแห่งชาติภูผายล`.
- Viewport-balanced layouts for Home, Knowledge, Mission, board example popup, and robot demo popup.
- Local Mali font files under `src/assets/fonts/`.

## Verification
- Tests: `npm test` — PASS (2 files, 4 tests).
- Production build: `npm run build` — PASS.
- Build warning: Vite still warns that the lazy-loaded Three.js/R3F `AdventureScene` chunk is larger than 500 kB after minification.
- Dev server: running in this session at `http://localhost:5173/` when this checkpoint was prepared.

## Known follow-ups
- Three.js/R3F produces a large lazy-loaded chunk; optimize only if classroom-device testing shows a problem.
- Review modal focus management and add browser-level interaction coverage before release.
- Resolve remaining content-owner choices in `CONTENT_AUDIT.md` for missing `อ่างเก็บน้ำห้วยหวด`, `ภูไท`, physical star/finish cards, and preferred indigo image.
- Do a final browser visual pass for board marker alignment after any board image or marker-size change.

## Resume command
```bash
cd "/Users/kanokkarn/Data/AI Title/projects/abs-bootcamp"
npm run dev
```
