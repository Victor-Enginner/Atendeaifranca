/**
 * ATENDE FRANCA — LIVE VIEW FRONTEND SERVER (Hot CSS + Instant HTML/JS Reload)
 * URL: http://localhost:5500
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = Number(process.env.PORT) || 5500;
const ROOT_DIR = path.join(__dirname, 'site');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const clients = new Set();

const LIVE_CLIENT_SNIPPET = `
<!-- ATENDE FRANCA CODE LIVE VIEW -->
<script>
(function() {
  const badge = document.createElement('div');
  badge.id = 'af-live-badge';
  badge.style.cssText = 'position:fixed;bottom:14px;left:14px;z-index:99999;display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:rgba(13,46,44,0.88);backdrop-filter:blur(12px);border:1px solid rgba(105,231,185,0.45);color:#f4f9f7;font:600 11px/1 "Plus Jakarta Sans",sans-serif;letter-spacing:0.04em;box-shadow:0 10px 26px rgba(9,23,22,0.28);pointer-events:none;transition:opacity 0.3s ease, transform 0.3s ease;';
  badge.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px #4ade80;"></span><span id="af-live-text">LIVE VIEW · PORTA ${PORT}</span>';
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(badge));

  const es = new EventSource('/__live_reload');
  es.onmessage = function(ev) {
    try {
      const data = JSON.parse(ev.data);
      const txt = document.getElementById('af-live-text');
      if (txt) txt.textContent = 'ATUALIZANDO: ' + (data.file || '');
      if (data.ext === '.css') {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
          const url = new URL(link.href, location.origin);
          url.searchParams.set('_t', Date.now());
          link.href = url.toString();
        });
        setTimeout(() => {
          if (txt) txt.textContent = 'LIVE VIEW · CSS ATUALIZADO';
        }, 350);
      } else {
        location.reload();
      }
    } catch (_) {
      location.reload();
    }
  };
})();
</script>
`;

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (reqUrl.pathname === '/__live_reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('retry: 800\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let safePath = decodeURIComponent(reqUrl.pathname);
  if (safePath === '/') safePath = '/index.html';

  let filePath = path.join(ROOT_DIR, safePath);
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Fallback to workspace root if requested with /site/ prefix
  if (!fs.existsSync(filePath) && safePath.startsWith('/site/')) {
    filePath = path.join(__dirname, safePath);
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + safePath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    if (ext === '.html') {
      fs.readFile(filePath, 'utf8', (readErr, html) => {
        if (readErr) {
          res.writeHead(500);
          res.end('Error reading HTML');
          return;
        }
        const injected = html.includes('</body>')
          ? html.replace('</body>', `${LIVE_CLIENT_SNIPPET}\n</body>`)
          : html + LIVE_CLIENT_SNIPPET;
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-store'
        });
        res.end(injected);
      });
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

let debounceTimer = null;
fs.watch(ROOT_DIR, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const ext = path.extname(filename).toLowerCase();
    const payload = JSON.stringify({ file: filename, ext, ts: Date.now() });
    for (const client of clients) {
      client.write(`data: ${payload}\n\n`);
    }
    console.log(`[LIVE VIEW] Hot-reload disparado -> ${filename}`);
  }, 90);
});

server.listen(PORT, '0.0.0.0', () => {
  const url = `http://localhost:${PORT}`;
  console.log(`========================================================`);
  console.log(`  ATENDE FRANCA — CODE LIVE VIEW FRONTEND ATIVO`);
  console.log(`  URL Local: ${url}`);
  console.log(`  Diretório: ${ROOT_DIR}`);
  console.log(`========================================================`);
  if (process.env.AUTO_OPEN !== '0') {
    exec(`start "" "${url}"`);
  }
});
