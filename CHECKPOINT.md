# ABS Bootcamp Checkpoint

**Date:** 2026-08-29
**Implementation baseline:** `146af3b feat: polish learning and robot demo flows`
**Checkpoint commit:** pending
**Deployment target:** static server upload of `dist/` after final commit

## Current artifact
The project contains a static React + TypeScript + Vite website for the unplugged “แดน 3 ธรรม” activity:

- Home view with compact hero, five-item navigation, enlarged step cards, and footer spacing tuned for viewport fit.
- Knowledge view for Dhamma, nature, and culture learning cards with updated nature assets.
- Mission view with a no-repeat random draw across 20 missions, reroll loading animation, and mission chips wrapping at a maximum of six items per row.
- Board-placement landing page and demo popup using the same board, marker sizing, mission example, and coordinate positions as the robot demonstration.
- Robot-command landing page and demo popup with manual step controls, play-auto control, pause, stop, reset, slow default speed, destination coordinates in each command, and no auto-start until Play is pressed.
- Local-only static assets and Mali font files under `src/assets/fonts/`.

## Verification
- Tests: `npm test` — PASS (2 files, 4 tests).
- Production build: `npm run build` — PASS.
- Build output directory: `dist/` generated successfully.
- Build warning: Vite still warns that the lazy-loaded Three.js/R3F `AdventureScene` chunk is larger than 500 kB after minification.
- Git status before this checkpoint update: modified `src/App.tsx`, `src/styles.css` only.

## Deployment security review

### Verdict
- Suitable for static deployment after final commit and one browser smoke test on the deployment URL.
- No backend, database, login, analytics, payments, or learner PII are present in the app.

### Environment matrix
| Environment | Data | Credentials | Access | Risk |
|---|---|---|---|---|
| Local dev | Static educational content only | None required | Developer machine | Low |
| Production static server | Static educational content and local assets | Server/SFTP credentials handled outside repo | Public web | Low; main risks are broken asset paths and oversized media |

### Required controls before production
- Upload only the generated `dist/` contents, not source files, `node_modules/`, or private workspace files.
- Do not place server credentials, tokens, `.env`, or screenshots with private data in the repo or deploy bundle.
- Serve over HTTPS if public-facing.
- Confirm static server fallback loads `index.html` for the app route, if using non-root paths.

### Backup and rollback plan
- Keep the previous deployed `dist/` archive or server folder before overwrite.
- Rollback by restoring the previous static folder/archive.
- Source rollback after commit: `git revert <deploy-commit>`.

### Monitoring / smoke checks
- Open the deployed URL and verify Home, Knowledge, Mission, Board, and Robot nav items.
- Verify `/รูปสถานที่สำคัญ/...` images and command-card assets load without 404.
- Run one mission draw and reroll.
- Open Board demo and Robot demo; verify close buttons and controls.

## Known follow-ups
- Three.js/R3F produces a large lazy-loaded chunk; optimize only if classroom-device testing shows a problem.
- Review modal focus management and add browser-level interaction coverage before release.
- Resolve remaining content-owner choices in `CONTENT_AUDIT.md` for missing `อ่างเก็บน้ำห้วยหวด`, `ภูไท`, physical star/finish cards, and preferred indigo image.
- Do a final browser visual pass for board marker alignment after any board image or marker-size change.

## Resume / deploy prep commands
```bash
cd "/Users/kanokkarn/Data/AI Title/projects/abs-bootcamp"
npm test
npm run build
# deploy the contents of dist/ to the static server
```
