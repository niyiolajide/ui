// Offline render smoke for RangeSelector (run after `npm run build`):
//   node scripts/test-rangeselector-render.mjs
// renderToStaticMarkup against the compiled dist output (override with UI_DIST for a
// scratch build) and assert the markup contract — link vs controlled mode, active
// styling, aria semantics — plus the rangeToDays helper.
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const dist = process.env.UI_DIST ?? new URL('../dist', import.meta.url).pathname
const mod = await import(`${dist}/components/RangeSelector.js`)
const { RangeSelector, DEFAULT_RANGES, rangeToDays } = mod

// --- rangeToDays helper --------------------------------------------------------------
assert.equal(rangeToDays('90d'), 90, 'default vocabulary resolves')
assert.equal(rangeToDays('all'), 30, 'open-ended range falls back')
assert.equal(rangeToDays('nope', DEFAULT_RANGES, 7), 7, 'unknown key uses given fallback')
assert.equal(rangeToDays('3M', [{ key: '3M', label: '3M', days: 91 }]), 91, 'custom options resolve')

// --- link mode -------------------------------------------------------------------------
const linked = renderToStaticMarkup(
  React.createElement(RangeSelector, {
    value: '30d',
    hrefFor: (key) => `/dashboard?range=${key}`,
    ariaLabel: 'Dashboard range',
  }),
)
assert.match(linked, /<nav aria-label="Dashboard range"/, 'link mode renders a nav landmark')
assert.match(linked, /href="\/dashboard\?range=7d"/, 'hrefFor drives link targets')
assert.match(
  linked,
  /aria-current="true"[^>]*href="\/dashboard\?range=30d"|href="\/dashboard\?range=30d"[^>]*aria-current="true"/,
  'active range gets aria-current',
)
assert.match(linked, /shadow-sm/, 'active segment gets the SegmentedControl active treatment')

// --- controlled mode ---------------------------------------------------------------------
const controlled = renderToStaticMarkup(
  React.createElement(RangeSelector, {
    value: '1Y',
    options: [
      { key: '1M', label: '1M', days: 30 },
      { key: '1Y', label: '1Y', days: 365 },
      { key: 'ALL', label: 'All' },
    ],
    onChange: () => {},
  }),
)
assert.match(controlled, /role="tablist" aria-label="Time range"/, 'controlled mode renders a tablist with default label')
assert.match(controlled, /aria-selected="true"[^>]*>1Y|role="tab"[^>]*aria-selected="true"/, 'value marks the selected tab')
assert.equal((controlled.match(/aria-selected="true"/g) ?? []).length, 1, 'exactly one selected tab')
assert.doesNotMatch(controlled, /<a /, 'controlled mode renders no links')

console.log('ok — RangeSelector render smoke (helper + link + controlled modes)')
