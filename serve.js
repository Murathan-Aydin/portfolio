'use strict'

const path = require('path')
const fs = require('fs')
const http = require('http')
const { parse } = require('url')

process.env.NODE_ENV = 'production'

const port = parseInt(process.env.PORT || '3000', 10)
const hostname = process.env.HOSTNAME || '0.0.0.0'

const PUBLIC_DIR = path.join(__dirname, 'public')

const MIME_TYPES = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.json': 'application/json',
}

// Dynamically require next from standalone node_modules
const next = require('next')

const app = next({ dev: false, dir: __dirname, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    // Serve files from public/ directly (handles dynamically created files like uploads)
    try {
      const filePath = path.join(PUBLIC_DIR, pathname)
      // Security: prevent path traversal outside public/
      if (filePath.startsWith(PUBLIC_DIR + path.sep) || filePath === PUBLIC_DIR) {
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath)
          if (stat.isFile()) {
            const ext = path.extname(filePath).toLowerCase()
            const mimeType = MIME_TYPES[ext] || 'application/octet-stream'
            res.setHeader('Content-Type', mimeType)
            if (pathname.startsWith('/images/')) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
            }
            res.setHeader('Content-Length', stat.size)
            fs.createReadStream(filePath).pipe(res)
            return
          }
        }
      }
    } catch (_) {}

    handle(req, res, parsedUrl)
  })

  server.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
