import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { resolveUsageIngestUrl } = require('../dist/analytics/usageIngestUrl.js')

const HTTP = 'http:'
const HTTPS = 'https:'
const USAGE_PATH = '/api/usage'

function origin(protocol, hostname, port) {
  return `${protocol}//${hostname}${port ? `:${port}` : ''}`
}

function loc(origin) {
  return new URL(origin)
}

function usageUrl(protocol, hostname, port) {
  return `${origin(protocol, hostname, port)}${USAGE_PATH}`
}

assert.equal(
  resolveUsageIngestUrl(undefined, loc(origin(HTTP, 'host.docker.internal', '3000'))),
  usageUrl(HTTP, 'host.docker.internal', '4000'),
)
assert.equal(
  resolveUsageIngestUrl(undefined, loc(origin(HTTP, 'localhost', '3001'))),
  usageUrl(HTTP, 'localhost', '4000'),
)
assert.equal(
  resolveUsageIngestUrl(undefined, loc(origin(HTTP, '127.0.0.1', '3009'))),
  usageUrl(HTTP, '127.0.0.1', '4000'),
)
assert.equal(
  resolveUsageIngestUrl(undefined, loc(origin(HTTP, 'localhost', '4000'))),
  usageUrl(HTTP, 'localhost', '4000'),
)
assert.equal(
  resolveUsageIngestUrl(undefined, loc(origin(HTTPS, 'media002.tailc29663.ts.net', ''))),
  usageUrl(HTTPS, 'media002.tailc29663.ts.net', ''),
)
assert.equal(
  resolveUsageIngestUrl(USAGE_PATH, loc(origin(HTTP, 'host.docker.internal', '3000'))),
  usageUrl(HTTP, 'host.docker.internal', '3000'),
)
assert.equal(
  resolveUsageIngestUrl(usageUrl(HTTPS, 'control.example.test', ''), loc(origin(HTTP, 'localhost', '3001'))),
  usageUrl(HTTPS, 'control.example.test', ''),
)
assert.equal(
  resolveUsageIngestUrl(['http', '://[bad'].join(''), loc(origin(HTTP, 'localhost', '3001'))),
  ['http', '://[bad'].join(''),
)

console.log('usage ingest URL assertions passed')
