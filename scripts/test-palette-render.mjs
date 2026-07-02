// Offline render smoke for CommandPalette (run after `npm run build`):
//   node scripts/test-palette-render.mjs
// Renders closed (trigger only) and defaultOpen (dialog + sections + cross-app
// jump index derived from registry apps) and asserts the markup contract.
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime.js'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime.js'
import pkg from '../dist/index.js'

const { CommandPalette } = pkg
const { appJumpCommands, fuzzyScore } = await import('../dist/components/CommandPalette.hooks.js')
  .then((m) => m.default ?? m)

const routerStub = { push() {}, replace() {}, prefetch() {}, back() {}, forward() {}, refresh() {} }
const wrap = (el) =>
  React.createElement(AppRouterContext.Provider, { value: routerStub },
    React.createElement(PathnameContext.Provider, { value: '/' }, el))

// --- pure helpers -----------------------------------------------------------------
assert.equal(fuzzyScore('', 'anything'), 0, 'empty query matches everything')
assert.equal(fuzzyScore('xyz', 'glucose'), -1, 'non-subsequence rejected')
assert.ok(fuzzyScore('glu', 'Glucose') >= 0, 'case-insensitive subsequence matches')
assert.ok(
  fuzzyScore('glu', 'Glucose') < fuzzyScore('glu', 'Goal unit list'),
  'contiguous match scores better than scattered',
)

const apps = [
  { key: 'healthpulse', name: 'HealthPulse', url: 'https://x/health', nav: [
    { key: 'glucose', label: 'Glucose', href: '/glucose', surfaces: ['web', 'phone'] },
    { key: 'phone-only', label: 'PhoneOnly', href: '/p', surfaces: ['phone'] },
  ] },
  { key: 'self', name: 'Self', url: 'https://x/self' },
]
const jumps = appJumpCommands(apps, 'self')
assert.deepEqual(
  jumps.map((c) => c.key),
  ['app:healthpulse', 'app:healthpulse:glucose'],
  'self excluded, phone-only nav filtered, app root + web nav indexed',
)
assert.equal(jumps[1].url, 'https://x/health/glucose', 'cross-app url = app url + nav href')

// --- closed render ------------------------------------------------------------------
const closed = renderToStaticMarkup(wrap(React.createElement(CommandPalette, { commands: [] })))
assert.match(closed, /aria-label="Open command palette"/, 'trigger renders when closed')
assert.doesNotMatch(closed, /role="dialog"/, 'dialog absent when closed')

// --- open render ---------------------------------------------------------------------
const open = renderToStaticMarkup(wrap(React.createElement(CommandPalette, {
  defaultOpen: true,
  placeholder: 'Search TestApp…',
  currentKey: 'self',
  apps,
  commands: [
    { key: 'overview', label: 'Overview', href: '/' },
    { key: 'import', label: 'Import data', group: 'actions', href: '/import' },
  ],
})))
assert.match(open, /role="dialog"[^>]*aria-label="Command palette"|aria-label="Command palette"[^>]*role="dialog"/, 'dialog renders when open')
assert.match(open, /placeholder="Search TestApp…"/, 'placeholder is forwarded')
assert.match(open, />Go to</, 'default section label renders')
assert.match(open, />Quick actions</, 'actions section label renders')
assert.match(open, />Other apps</, 'cross-app section renders')
assert.match(open, /HealthPulse · Glucose/, 'cross-app nav entry indexed from registry apps')

console.log('ok — CommandPalette render smoke (helpers + closed + open)')
