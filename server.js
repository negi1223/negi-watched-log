const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp'
};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const full = path.join(__dirname, p);
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found: '+p); return; }
    const ext = path.extname(full);
    res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(8931, ()=>console.log('listening on 8931'));
