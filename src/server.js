const http = require('node:http');

const PORT = process.env.PORT || 3000;

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200);
      return res.end(JSON.stringify({
        message: 'API Praktik Pipeline CI berjalan',
        status: 'success'
      }));
    }

    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200);
      return res.end(JSON.stringify({ status: 'healthy' }));
    }

    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'Route tidak ditemukan' }));
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
  });
}

module.exports = { createServer };
