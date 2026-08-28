# Worklog — ABS Bootcamp

## 2026-08-28 — Checkpoint before pause

### Completed since the previous checkpoint
- Added the animated robot demonstration in full-screen mode.
- Added an animated side flow that auto-scrolls to the active movement step.
- Added the board-placement example popup and full-screen board view.
- Updated board examples to use supplied landmark and obstacle images.
- Rebalanced hero, flow cards, popup sizing, headings, footer spacing, and Thai Mali font usage.
- Stopped the local dev server on request.

### Verification at checkpoint
- `npm test` — 4 tests passed.
- `npm run build` — passed; Vite emits a warning about the large Three.js chunk, but the build succeeds.
- Git working tree is clean.

### Resume point
- Restart with `npm run dev` from this directory.
- Review the latest robot full-screen flow and board example interaction on a real tablet-sized viewport.
- Consider optimizing the Three.js chunk and adding a formal component/browser test for the modal and robot-flow interactions.

## 2026-08-26 — Project initialization

### Completed
- Inspected the initial project materials under `data/`.
- Identified two source documents describing the Sakon Nakhon “3 Dhamma” learning-game content and 20 proposed routes.
- Identified 21 PNG visual assets for landmarks and obstacles.
- Confirmed the unplugged activity flow: learners place the board assets, choose a start square, plan a route, and assign robot and programmer roles.
- Created the initial project plan.
- Audited source content and documented canonical labels, image mappings, and unresolved asset gaps in `CONTENT_AUDIT.md`.
- Created the React + TypeScript + Vite static website with Knowledge and randomized Mission parts.
- Added a lightweight Three.js scene, DOM-based mission-card motion, a no-repeat mission draw, and local-only content/assets.
- Added an automated test for the mission draw helper; production build passes.

### Current status
Implementation complete for the first website artifact. Awaiting Trainer review and content-owner decisions for the unresolved image assets.

### Confirmed facts
- The intended product is an educational, grid-based unplugged activity based on the supplied “3 Dhamma” content.
- The game board is an 8×8 grid (`data/พื้นที่เกม.png`) with coordinates A–H and 1–8.
- Learners arrange the landmark and obstacle pictures and set the robot starting point before planning the mission.
- One team member is the robot; another is the programmer who prepares the movement instructions.
- The supplied documents and images are the authoritative initial content set.
- Website display labels use the canonical corrections documented in `CONTENT_AUDIT.md`; original DOCX files remain unchanged.

### Verification
- Confirmed `data/` contains `แดน 3 ธรรม.docx`, `ภารกิจเส้นทาง.docx`, and 21 PNG assets.

### Risks / open questions
- Target age range, the exact instruction vocabulary, and how a mission card defines its destinations are not yet confirmed.
- Several place names in the route document do not exactly match the available image filenames; a content mapping will be needed.
- Three mission locations have no matching supplied image and intentionally render a clear labelled placeholder.
- The supplied large PNG files are used as local static assets and should be optimized for production after Trainer selects final imagery.

## 2026-08-28 — Robot flow popup layout
- Changed the robot demo command sequence from a fixed right-side panel into a floating draggable popup, so the board and controls can stay visually balanced.
- Added pointer-drag state local to `RobotDemoModal` and responsive `vw`/`vh` sizing for the floating popup.
- Verification: `npm run build` PASS; `npm test` PASS; dev server `http://127.0.0.1:5173/` returned HTTP 200.

## 2026-08-28 — Viewport polish, board examples, and asset updates
- Matched Knowledge and Mission header rhythm to the Home view and reduced content spacing so pages fit the viewport more consistently.
- Adjusted Knowledge image sizing to preserve tall supplied card artwork while keeping the panel compact.
- Added supplied nature images: `น้ำตกคำสร้าง ห้วยหวด ภูผายล.png`, `อุทยานแห่งชาติภูพาน.png`, and `อุทยานแห่งชาติภูผายล.png`.
- Updated content mapping and audit notes for `น้ำตกคำน้ำสร้าง`, `อุทยานแห่งชาติภูพาน`, and `อุทยานแห่งชาติภูผายล`.
- Removed the experimental Knowledge full-screen panel/image behavior after Trainer review.
- Aligned the board-placement example popup with the robot demo example: same board, marker sizing, robot at start, and coordinate positions.
- Reworked robot demo behavior so it starts paused, defaults to slow speed, supports manual `ก่อนหน้า`/`ถัดไป` step-by-step controls, and has a separate auto-play button.
- Added destination coordinates to robot command text, for example `เดินขึ้น 1 ช่อง ไป B3` and `เดินลง 1 ช่อง ไป G7: ถึงจุดจบ!`.
- Changed star-complete marker text to `H5 เก็บดาวแล้ว`.
- Tuned robot demo popup height, title top spacing, controls bottom margin, slider width, and close-button positioning to fit the visible viewport.
- Verification: `npm test` PASS; `npm run build` PASS with the existing Vite large-chunk warning for `AdventureScene`.

## 2026-08-29 — Deployment preparation checkpoint
- Converted navigation items `3. วางรูปบนตาราง` and `4. สั่งหุ่นยนต์เดิน` into first-class page views before opening their demo popups.
- Removed hero CTA buttons and the `ABS BOOTCAMP · UNPLUGGED` eyebrow so the top area is cleaner and navigation is the primary route.
- Tuned Home card height, typography, line spacing, and vertical placement based on Trainer screenshots.
- Fixed menu active behavior to follow the selected page view.
- Tuned Mission result presentation: reroll animation duration, star card coloring, six-chip row wrapping, row centering, and close-button placement.
- Prepared deployment notes in `CHECKPOINT.md` for static `dist/` upload, rollback, and smoke checks.
- Verification: `npm test` PASS; `npm run build` PASS with the existing Vite large-chunk warning for `AdventureScene`.
