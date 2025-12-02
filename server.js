'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5173;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  // Serve .jsx as plain text; Babel Standalone will transpile it in the browser
  '.jsx': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function safeJoin(base, target) {
  const targetPath = path.posix.normalize('/' + target);
  return path.join(base, targetPath);
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  if (body && (body.pipe || typeof body === 'string' || Buffer.isBuffer(body))) {
    if (body.pipe) body.pipe(res);
    else res.end(body);
  } else {
    res.end();
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = decodeURI(parsedUrl.pathname || '/');

  // Default to index.html
  if (pathname === '/') pathname = '/index.html';

  const filePath = safeJoin(ROOT, pathname);

  // Prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    return send(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA-style fallback for unknown routes
      const fallback = path.join(ROOT, 'index.html');
      return fs.readFile(fallback, (e, data) => {
        if (e) return send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not found');
        send(res, 200, { 'Content-Type': 'text/html; charset=utf-8' }, data);
      });
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}`);
});


