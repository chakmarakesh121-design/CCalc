process.env.NODE_ENV = 'test';

import { once } from 'node:events';
import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../server.js';

const server = app.listen(0, '127.0.0.1');
await once(server, 'listening');

async function request(pathname) {
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const response = await fetch(`${baseUrl}${pathname}`);
  const text = await response.text();
  return { status: response.status, text };
}

test('serves the About Us page at /about', async () => {
  const { status, text } = await request('/about');
  assert.equal(status, 200);
  assert.match(text, /About Us/i);
});

test('serves the Terms and Conditions page at /terms', async () => {
  const { status, text } = await request('/terms');
  assert.equal(status, 200);
  assert.match(text, /Terms & Conditions/i);
});
