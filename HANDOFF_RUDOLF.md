# Handoff to Symboli Rudolf — ABS Bootcamp Plesk Deploy

Date: 2026-08-29 03:20 ICT
From: Tomi
Project path: `/Users/kanokkarn/Data/AI Title/projects/abs-bootcamp`
GitHub: `https://github.com/noonet2016/abs-bootcamp`
Branch: `main`

## Situation summary

Trainer asked to deploy `abs-bootcamp` to Plesk domain `krutak.thatnarai.net` under/around path `abs-bootcamp`.

I made several incorrect deployment guidance steps and frustrated Trainer. The important current production blocker is Plesk Node.js/Passenger still reports:

```text
/krutak.thatnarai.net/abs-bootcamp/app.js is not found
```

The most likely immediate cause is that Plesk has not pulled/deployed the newest GitHub commit containing `app.js`, or Git deploy path/application root mismatch remains.

## What I changed locally and pushed

### Commit `50c48d5`

```text
chore: include static build for plesk deploy
```

Purpose: commit prebuilt Vite `dist/` so Plesk does not need server-side `npm install` / `npm run build`.

Reason: Plesk Git additional deployment actions failed because `npm` was unavailable in Git deploy shell:

```text
npm: command not found
/opt/plesk/node/24/bin/npm: No such file or directory
```

### Commit `ea75f84`

```text
feat: serve static build through passenger node
```

Changes:
- Added root `app.js` Node HTTP server.
- Added package script:

```json
"start": "node app.js"
```

`app.js` serves files from local `dist/`, supports both `/` and `/abs-bootcamp/` paths, and falls back to `dist/index.html` for SPA routes.

## Verified locally before push

Commands run successfully:

```bash
npm test
npm run build
node app.js
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1:3000/abs-bootcamp/
```

Both curl checks returned:

```text
HTTP/1.1 200 OK
```

Latest local/GitHub commit at handoff:

```text
ea75f84 feat: serve static build through passenger node
50c48d5 chore: include static build for plesk deploy
93361b8 feat: prepare static deployment flow
146af3b feat: polish learning and robot demo flows
a1a5b8a feat: add robot command card flow
40782fd docs: identify checkpoint commit
```

Local working tree status before this handoff file was created: clean.

## Plesk facts observed from screenshots

Domain: `krutak.thatnarai.net`
System user shown: `activity69`
IP shown: `203.170.190.21`
Plesk Git repo card: `abs-bootcamp.git`
Repo URL: `https://github.com/noonet2016/abs-bootcamp.git`
Branch: `main`
Git deploy path shown earlier:

```text
/krutak.thatnarai.net/abs-bootcamp
```

Plesk latest commits before `app.js` pull appeared to show up to `50c48d5`; needs confirmation after pull.

Node.js page currently showed:

```text
Node.js Version: 24.19.0
Package Manager: npm
Application URL: http://krutak.thatnarai.net
Application Root: /krutak.thatnarai.net/abs-bootcamp
Application Startup File: app.js
Document Root: /krutak.thatnarai.net/abs-bootcamp
```

But status still said:

```text
startup file /krutak.thatnarai.net/abs-bootcamp/app.js is not found
```

## Important correction: do not rely on prior mistaken advice

I gave confusing guidance about Document root values. Treat Plesk UI as authoritative and verify with File Manager if unsure.

For Node.js/Passenger mode, the intended mapping should be:

```text
Application Root: /krutak.thatnarai.net/abs-bootcamp
Application Startup File: app.js
```

Document Root may remain the value Plesk accepts for the app. Since `app.js` serves `dist/`, the critical requirement is that `app.js` exists at the Application Root on server and Passenger starts it.

## Recommended next steps for Rudolf

1. In Plesk Git Repositories, on `abs-bootcamp.git`:
   - Click `Pull now`.
   - Confirm latest commit is:

```text
ea75f84 feat: serve static build through passenger node
```

2. Click `Deploy now`.

3. In Plesk File Manager or Application Root open link, verify these files exist on server:

```text
/krutak.thatnarai.net/abs-bootcamp/app.js
/krutak.thatnarai.net/abs-bootcamp/package.json
/krutak.thatnarai.net/abs-bootcamp/dist/index.html
```

4. In Node.js page, verify:

```text
Application Root: /krutak.thatnarai.net/abs-bootcamp
Application Startup File: app.js
```

5. Click `Restart App`.

6. Open:

```text
https://krutak.thatnarai.net/
```

7. If Passenger still errors, click `Technical details for the administrator of this website` or inspect Passenger/app logs in Plesk. Do not guess; read the exact error.

## Rollback options

### Rollback to pre-Node static attempt

```bash
git revert ea75f84
```

Then deploy commit `50c48d5` and serve `dist/` by web server Document root if Plesk hosting settings are confirmed.

### Rollback to before committed dist

```bash
git revert ea75f84 50c48d5
```

Then return to source-only repo and solve Plesk-side build environment separately.

### Plesk emergency rollback

- Disable Node.js for `krutak.thatnarai.net` if Passenger keeps crashing.
- Restore previous working Document root or deploy previous known commit in Plesk Git UI.

## Risk notes

- Repo was changed to include `dist/` even though `.gitignore` normally ignores it. This is deliberate for Plesk static deployment workaround.
- No secrets were printed or committed by me. `.env*` remains ignored.
- Node.js is only serving static files from `dist/`; no database or credentials involved.

## Communication note

Trainer is frustrated because I gave repeated incorrect Plesk path guidance. Please take over with evidence-first debugging: confirm files on server via Plesk File Manager/logs before changing more settings.
