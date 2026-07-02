// Offline render smoke for AppShell's topbarLeft forwarding + breadcrumbs
// (run after `npm run build`):  node scripts/test-appshell-render.mjs
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime.js'
import pkg from '../dist/index.js'

const { AppShell } = pkg

const html = renderToStaticMarkup(
  React.createElement(PathnameContext.Provider, { value: '/tasks/42' },
    React.createElement(AppShell, {
      appName: 'TestApp',
      apps: [],
      themeToggle: false,
      topbarLeft: React.createElement('button', { id: 'nav-trigger' }, 'menu'),
      breadcrumbs: [
        { label: 'Tasks', href: '/tasks' },
        { label: 'TASK-42' },
      ],
    }, React.createElement('p', null, 'body')),
  ),
)

assert.match(html, /<header[^>]*>.*id="nav-trigger".*<\/header>/s, 'topbarLeft is forwarded into the Topbar')
assert.match(html, /aria-label="Breadcrumb"/, 'breadcrumb nav landmark renders')
assert.match(html, /href="\/tasks"[^>]*>Tasks|>Tasks<\/a>/, 'non-last crumb is a link')
assert.match(html, /aria-current="page"[^>]*>TASK-42/, 'last crumb is the current page, not a link')
assert.match(html, /<p>body<\/p>/, 'children still render after the trail')

const bare = renderToStaticMarkup(
  React.createElement(PathnameContext.Provider, { value: '/' },
    React.createElement(AppShell, { appName: 'TestApp', apps: [], themeToggle: false }, React.createElement('p', null, 'x')),
  ),
)
assert.doesNotMatch(bare, /aria-label="Breadcrumb"/, 'no breadcrumbs prop -> no trail')

console.log('ok — AppShell topbarLeft + breadcrumbs render smoke')
