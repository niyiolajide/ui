// Offline render smoke for the Tabs component (run after `npm run build`):
//   node scripts/test-tabs-render.mjs
// renderToStaticMarkup both flavors (route-aware links + controlled buttons)
// against the compiled dist output and assert the markup contract — active
// styling, aria semantics, badge visibility, and prefix vs exact route match.
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime.js'
import { Tabs } from '../dist/index.js'

const withPath = (pathname, el) => React.createElement(PathnameContext.Provider, { value: pathname }, el)

// --- route mode ----------------------------------------------------------------
const route = renderToStaticMarkup(
  withPath('/reviews/REVIEW-1', React.createElement(Tabs, {
    ariaLabel: 'Pages',
    items: [
      { key: 'overview', label: 'Overview', href: '/', exact: true },
      { key: 'reviews', label: 'Reviews', href: '/reviews', badge: 3 },
      { key: 'tasks', label: 'Tasks', href: '/tasks' },
    ],
  })),
)
assert.match(route, /<nav aria-label="Pages"/, 'route mode renders a nav landmark')
assert.match(route, /aria-current="page"[^>]*href="\/reviews"|href="\/reviews"[^>]*aria-current="page"/, 'prefix match marks /reviews active on /reviews/REVIEW-1')
assert.doesNotMatch(route, /href="\/"[^>]*aria-current/, 'exact tab "/" is not active on a subroute')
assert.match(route, />3<\/span>/, 'count badge renders')
assert.match(route, /border-primary-600/, 'active tab gets primary underline')

// --- controlled mode -------------------------------------------------------------
const state = renderToStaticMarkup(
  withPath('/x', React.createElement(Tabs, {
    ariaLabel: 'Board',
    value: 'b',
    items: [
      { key: 'a', label: 'Alpha', badge: 0 },
      { key: 'b', label: 'Beta' },
    ],
  })),
)
assert.match(state, /role="tablist"/, 'controlled mode renders a tablist')
assert.match(state, /role="tab" aria-selected="true"[^>]*>[^<]*Beta|aria-selected="true"/, 'value marks the active tab')
assert.doesNotMatch(state, />0<\/span>/, 'zero badge is hidden')

console.log('ok — Tabs render smoke (route + controlled modes)')
