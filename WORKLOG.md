# Worklog — ABS Bootcamp

## 2026-08-26 — Project initialization

### Completed
- Inspected the initial project materials under `data/`.
- Identified two source documents describing the Sakon Nakhon “3 Dhamma” learning-game content and 20 proposed routes.
- Identified 21 PNG visual assets for landmarks and obstacles.
- Confirmed the unplugged activity flow: learners place the board assets, choose a start square, plan a route, and assign robot and programmer roles.
- Created the initial project plan.

### Current status
Planning. No application code, dependency manifest, or implementation scaffold exists yet.

### Confirmed facts
- The intended product is an educational, grid-based unplugged activity based on the supplied “3 Dhamma” content.
- The game board is an 8×8 grid (`data/พื้นที่เกม.png`) with coordinates A–H and 1–8.
- Learners arrange the landmark and obstacle pictures and set the robot starting point before planning the mission.
- One team member is the robot; another is the programmer who prepares the movement instructions.
- The supplied documents and images are the authoritative initial content set.

### Verification
- Confirmed `data/` contains `แดน 3 ธรรม.docx`, `ภารกิจเส้นทาง.docx`, and 21 PNG assets.

### Risks / open questions
- Target age range, the exact instruction vocabulary, and how a mission card defines its destinations are not yet confirmed.
- Several place names in the route document do not exactly match the available image filenames; a content mapping will be needed.
