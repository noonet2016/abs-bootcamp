# Worklog — ABS Bootcamp

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
