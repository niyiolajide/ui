// Offline render smoke for the Sidebar shell component (run after `npm run build`):
//   node scripts/test-sidebar-render.mjs
// renderToStaticMarkup against the compiled dist output (override with UI_DIST for a
// scratch build) and assert the markup contract — active styling on path-only matching,
// badges, hrefDecorator rewriting, and collapsible-group semantics.
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime.js'

const dist = process.env.UI_DIST ?? new URL('../dist', import.meta.url).pathname
const mod = await import(`${dist}/shell/Sidebar.js`)
const Sidebar = mod.default?.default ?? mod.default // CJS interop: default may be nested

const withPath = (pathname, el) => React.createElement(PathnameContext.Provider, { value: pathname }, el)
const render = (pathname, props) => renderToStaticMarkup(withPath(pathname, React.createElement(Sidebar, props)))

// --- legacy API unchanged ---------------------------------------------------------
const legacy = render('/dashboard/sub', {
  groups: [{ label: 'Main', items: [
    { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/settings', label: 'Settings' },
  ] }],
})
assert.match(legacy, /<p[^>]*>Main<\/p>/, 'plain group label stays a <p>, not a button')
assert.match(legacy, /aria-current="page"/, 'prefix match marks /dashboard active on /dashboard/sub')
assert.doesNotMatch(legacy, /href="\/settings"[^>]*aria-current/, 'inactive item has no aria-current')
assert.doesNotMatch(legacy, /aria-expanded/, 'non-collapsible groups render no toggle')

// --- badge -------------------------------------------------------------------------
const badged = render('/x', {
  groups: [{ items: [
    { href: '/alerts', label: 'Alerts', badge: 7 },
    { href: '/other', label: 'Other' },
  ] }],
})
assert.match(badged, />7<\/span>/, 'numeric badge renders as a pill')
assert.strictEqual((badged.match(/badge/g) ?? []).length > 0, true, 'badge uses the Badge primitive classes')

// --- hrefDecorator -------------------------------------------------------------------
const decorated = render('/plans', {
  groups: [{ items: [
    { href: '/plans', label: 'Plans' },
    { href: '/report', label: 'Report' },
  ] }],
  hrefDecorator: (href) => `${href}?v=balanced`,
})
assert.match(decorated, /href="\/plans\?v=balanced"/, 'decorator rewrites rendered hrefs')
assert.match(
  decorated,
  /aria-current="page"[^>]*href="\/plans\?v=balanced"|href="\/plans\?v=balanced"[^>]*aria-current="page"/,
  'active matching ignores the decorated query string',
)

// --- collapsible groups ---------------------------------------------------------------
const collapsedProps = {
  groups: [
    { label: 'Open', items: [{ href: '/a', label: 'A' }] },
    { label: 'Shut', collapsible: true, defaultCollapsed: true, items: [{ href: '/hidden', label: 'Hidden' }] },
  ],
}
const collapsed = render('/a', collapsedProps)
assert.match(collapsed, /aria-expanded="false"/, 'defaultCollapsed group renders collapsed toggle')
assert.doesNotMatch(collapsed, /Hidden/, 'collapsed group hides its items')

const activeInside = render('/hidden', collapsedProps)
assert.match(activeInside, /aria-expanded="true"/, 'group holding the active route stays open')
assert.match(activeInside, /Hidden/, 'active item is visible despite defaultCollapsed')

console.log('ok — Sidebar render smoke (legacy + badge + hrefDecorator + collapsible)')
