const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../src/server');

async function withServer(run) {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve())
    );
  }
}

test('GET / mengembalikan status 200 dan pesan API', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'success');
    assert.equal(body.message, 'API Praktik Pipeline CI berjalan');
  });
});

test('GET /health mengembalikan status healthy', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'healthy');
  });
});

test('route yang tidak tersedia mengembalikan 404', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/tidak-ada`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.message, 'Route tidak ditemukan');
  });
});
