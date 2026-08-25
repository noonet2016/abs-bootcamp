# Test Plan — ABS Bootcamp Website

## Scope
This plan covers the planned **static React + TypeScript** website for the physical, unplugged “แดน 3 ธรรม” activity for Thai learners in Primary 1–3.

The experience has two parts:

1. **Knowledge** — child-friendly local-learning content about Sakon Nakhon’s three domains: Dhamma, nature, and culture, using the supplied copy and landmark images.
2. **Mission** — a randomly drawn animated mission card based on the supplied mission source. Teams carry that mission to the physical 8×8 board; this website does not replace the physical activity.

The planned decorative landing scene uses a single Three.js/React Three Fiber canvas. Mission cards and all essential instructions remain ordinary HTML controls and text.

## Assumptions and exclusions
- The site contains no login, backend, database, analytics, payments, or learner PII.
- Mission selection is client-side and random; no selected mission needs to persist after a page reload unless this becomes an explicit requirement.
- The app is deployed as static files and must work after assets are locally available.
- Exact copy, landmark-to-image mapping, and mission transcription must be verified against the two supplied `.docx` source files before release.
- This plan does not validate how a team physically lays out the board or walks the robot; it validates that the website communicates that process accurately.

## Risk ranking

| Area | Risk | Test priority |
| --- | --- | --- |
| Source-content accuracy | Incorrect Thai facts, mission text, or an incorrect landmark image teaches children the wrong information. | P0 |
| Mission draw | A broken or non-random draw prevents the core activity or repeats one mission unexpectedly. | P0 |
| Child usability | Small, unclear, or confusing controls block P1–P3 learners from independently using the activity. | P0 |
| Accessibility | Canvas-only information, inaccessible card interaction, motion sensitivity, or poor contrast excludes learners. | P0 |
| Static deployment | Broken asset paths or direct-page refresh failures make the local/on-site deployment unusable. | P0 |
| Three.js scene | Excess graphics work causes slow or unstable use on classroom tablets. | P1 |
| Responsive layout | Details or controls are clipped at small tablet/mobile sizes. | P1 |
| Visual polish | Animation timing or image cropping is distracting but does not prevent the activity. | P2 |

## Test data and environments

### Content fixtures
- A reviewed inventory of every landmark, its domain, Thai title, short description, and local image path.
- A reviewed transcription of all 20 missions: identifier/title, destination(s), obstacle/star condition, and child-facing instruction.
- At least one mission for every domain and one mission for each applicable condition (obstacle and star, if specified by the source).

### Environments
- Local production build served with a static HTTP server (not only the Vite development server).
- Current desktop Chrome or Edge for keyboard checks.
- Safari on an iPad-class viewport and Chrome Android-class viewport, or equivalent device emulation plus at least one real touch device before release.
- A reduced-motion environment (`prefers-reduced-motion: reduce`).
- Network disabled after initial local asset availability, to verify no runtime internet dependency.

## Test cases

| ID | Scenario / steps | Expected result | Type | Priority |
| --- | --- | --- | --- | --- |
| P0-01 | Compare each Knowledge item with the reviewed source inventory. | Thai title, domain, description, and image match the approved source; no invented fact is presented as source fact. | Content review | P0 |
| P0-02 | Compare all 20 rendered mission cards/details with the reviewed mission transcription. | Every mission is present once with correct title, destinations, conditions, and instructions. | Content review | P0 |
| P0-03 | Open the landing page and choose Knowledge; open each of the three domains and return. | The child can reach and leave every domain using obvious Thai-labeled controls; content remains readable. | E2E/manual | P0 |
| P0-04 | Open Mission and activate “สุ่มภารกิจ” repeatedly (including 20+ draws). | A valid mission appears on every draw; the card presents its required information; drawing again does not crash or leave a blank state. | Unit + E2E | P0 |
| P0-05 | Exercise the randomizer with a controlled/randomness-mocked test across the full source array. | It selects only valid missions, never mutates source data, and can select every mission over repeated draws. | Unit | P0 |
| P0-06 | From a drawn card, reveal any details/instructions and close them; repeat with keyboard and touch. | Details are understandable, the close/back action works, and focus returns to the originating control. | E2E/accessibility | P0 |
| P0-07 | Read the mission handoff/instruction text. | It explicitly directs teams to use the physical 8×8 board: place pictures, choose a start square, plan instructions, and have a teammate act as robot; it does not imply a fixed board layout. | Content review | P0 |
| P0-08 | Build the app and serve the generated output; load at the configured base URL, then refresh each intended direct URL. | HTML, images, fonts, and JS load without 404 errors; navigation/refresh behavior matches the selected routing approach. | Build/deployment | P0 |
| P0-09 | Load the production build with network access disabled after assets are present. | Knowledge and Mission remain usable and no essential request goes to a third party. | Integration/manual | P0 |
| P0-10 | Navigate all interactive controls by keyboard: Tab, Shift+Tab, Enter, Space, Escape where applicable. | Focus order is visible and logical; every action is available without a pointer; no focus trap occurs. | Accessibility | P0 |
| P0-11 | Use a screen reader smoke test on landing, Knowledge, and Mission. | Page/section headings, buttons, card labels, image alt text, dialog semantics (if used), and status after a draw are announced meaningfully in Thai. Canvas is not the only source of essential information. | Accessibility/manual | P0 |
| P0-12 | Enable reduced motion and open/operate the site. | Nonessential animation is substantially reduced or paused; no autoplaying 3D motion is required to understand or operate the site. | Accessibility/manual | P0 |
| P1-01 | Test at 320 px, 768 px portrait, 1024 px tablet landscape, and desktop widths; test zoom at 200%. | No clipped text, overlapping controls, inaccessible off-screen action, or horizontal scrolling caused by normal content. | Responsive/manual | P1 |
| P1-02 | Operate key flows using only touch on a tablet/phone. | Tap targets are comfortably large (target 44×44 CSS px minimum where practical); hover is not required; cards do not need precision gestures. | Usability/manual | P1 |
| P1-03 | Inspect image fallbacks by temporarily using an invalid local image path in a development-only test. | The layout remains understandable and an informative alt/fallback state is available; no broken-image-only instruction is essential. | Resilience/manual | P1 |
| P1-04 | Run with the 3D canvas visible, navigate away, background the tab, then return. | The scene does not block navigation; animation is paused/throttled off-screen or in a hidden tab; no console errors or memory growth is observed during repeated navigation. | Performance/manual | P1 |
| P1-05 | Verify representative text/background, button, focus-ring, and status-state contrast with a contrast checker. | Normal Thai text meets WCAG AA contrast (4.5:1; 3:1 for large text); non-text UI indicators/focus cues remain distinguishable. | Accessibility | P1 |
| P2-01 | Review animations with a P1–P3 learner/teacher observer where possible. | Motion attracts attention but does not delay reading, conceal instructions, or create a misleading game outcome. | Exploratory | P2 |
| P2-02 | Re-open the app after a mission has been drawn. | The specified reset/persistence behavior is consistent and explained only if relevant; no stale or corrupted UI appears. | Regression | P2 |

## Automated regression candidates
- Unit tests for content schema validation: unique mission IDs, exactly 20 approved missions, required Thai fields, valid category values, and existing local asset paths.
- Unit tests for `drawMission` / shuffle behavior using injected deterministic randomness.
- Component tests for Knowledge navigation, draw state, card details, and error/empty defensive state.
- One browser E2E smoke flow: landing → Knowledge domain → Mission → draw → open details → draw again.
- Production build check in CI or before handoff: typecheck, lint, test, build, and static-asset link check.

## Accessibility acceptance checklist
- [ ] The page has one clear `h1`; major sections use a logical heading hierarchy.
- [ ] Interactive cards are semantic buttons/links, not clickable `div`s.
- [ ] Each image has useful Thai alternative text; purely decorative images are hidden from assistive technology.
- [ ] Motion honors `prefers-reduced-motion` and never conveys exclusive information.
- [ ] WebGL has an accessible text equivalent and a graceful unavailable/error fallback.
- [ ] Visible keyboard focus is retained against every background.
- [ ] Mission-draw changes are announced without unexpectedly moving focus.
- [ ] Controls use short Thai labels appropriate for P1–P3 and do not rely on color alone.
- [ ] Keyboard, touch, 200% zoom, and screen-reader smoke checks pass.

## Performance guardrails
These are initial release guardrails to be measured on the production build and adjusted only with recorded evidence.

| Measure | Guardrail | Verification |
| --- | --- | --- |
| Initial JavaScript | Aim for ≤ 300 KB gzip for the initial route; lazy-load the Three.js/R3F scene if measurement exceeds this. | Build analyzer / browser network panel |
| Initial images | Aim for ≤ 1 MB total above-the-fold images; use appropriately sized compressed local assets and lazy-load below-the-fold images. | Browser network panel |
| First usable content | Knowledge and Mission navigation/interactions usable within 3 s on a representative mid-range classroom tablet over local Wi-Fi or local server. | Manual timed run / Lighthouse supporting evidence |
| Mission draw response | Card visibly updates within 100 ms of activation under normal conditions. | Browser performance trace/manual observation |
| WebGL | One canvas only; cap DPR around 1–1.5; no per-card canvas; pause rendering when hidden/off-screen. | Code review + performance trace |
| Stability | No uncaught console errors, sustained animation work in background tabs, or increasing memory after 10 route/section changes. | DevTools manual check |

## Regression checklist
- [ ] Run source-content comparison after any change to mission or landmark data.
- [ ] Run unit/component suite and the one critical browser smoke flow.
- [ ] Run typecheck, lint, and production build.
- [ ] Re-check static hosting/base-path behavior after deployment changes.
- [ ] Test desktop keyboard flow, one touch viewport/device, and reduced motion.
- [ ] Check 3D fallback/performance after any Three.js dependency or scene change.
- [ ] Review `git diff` to ensure no learner data, credentials, or external tracking were added.

## Release gate
Release is **PASS** only when:

1. P0 test cases pass and each fact/mission has source-review evidence.
2. The production static build succeeds with no broken required assets or console errors.
3. Keyboard, reduced-motion, screen-reader smoke, responsive, and touch checks pass.
4. The 3D scene remains decorative and meets the performance guardrails (or has a recorded, approved fallback).
5. Any P1/P2 failure has an owner, impact statement, and explicit Trainer acceptance before release.

## Verification record
- **Plan author:** Tomi
- **Status:** Planned; no application implementation existed when this plan was written.
- **Document check:** Markdown structure and repository diff to be checked before commit.
