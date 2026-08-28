import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const distRoot = resolve(__dirname, 'dist')
const port = Number(process.env.PORT || process.env.PASSENGER_PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

function sendFile(res, filePath) {
  const extension = extname(filePath).toLowerCase()
  res.writeHead(200, {
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
    'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
  })
  createReadStream(filePath).pipe(res)
}

function resolveRequestPath(url = '/') {
  const pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname)
  const cleaned = normalize(pathname).replace(/^\.\.(\/|\\|$)/, '')
  const withoutBase = cleaned.replace(/^\/abs-bootcamp(?=\/|$)/, '')
  const candidate = resolve(distRoot, `.${withoutBase}`)

  if (!candidate.startsWith(distRoot)) return null
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate

  const indexCandidate = join(candidate, 'index.html')
  if (existsSync(indexCandidate) && statSync(indexCandidate).isFile()) return indexCandidate

  return join(distRoot, 'index.html')
}

const server = createServer((req, res) => {
  try {
    const filePath = resolveRequestPath(req.url)
    if (!filePath || !existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Not found')
      return
    }
    sendFile(res, filePath)
  } catch (error) {
    console.error(error)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal server error')
  }
})

server.listen(port, host, () => {
  console.log(`ABS Bootcamp static server listening on http://${host}:${port}`)
})
