import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.mjs': 'application/javascript'
};

function serve(res, filePath) {
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
}

http.createServer((req, res) => {
  const rawUrl = decodeURIComponent(req.url.split('?')[0]);
  if (rawUrl === '/') { serve(res, path.join(__dirname, 'index.html')); return; }

  if (!path.extname(rawUrl)) {
    // Try as a .html file first (e.g. /login → login.html), then as a directory index
    const htmlPath = path.join(__dirname, rawUrl.replace(/\/$/, '') + '.html');
    const dirPath  = path.join(__dirname, rawUrl.replace(/\/$/, '') + '/index.html');
    fs.access(htmlPath, fs.constants.F_OK, err => {
      if (!err) { serve(res, htmlPath); }
      else { serve(res, dirPath); }
    });
  } else {
    serve(res, path.join(__dirname, rawUrl));
  }
}).listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
