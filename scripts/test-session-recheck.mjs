// Offline effect-lifecycle tests for SessionRecheck (run after `npm run build`):
//   node scripts/test-session-recheck.mjs
// Mounts the compiled hook/component with react-test-renderer (real React effect
// lifecycle) against a stubbed window EventTarget and fetch mock, and asserts the
// history-session contract: popstate+401 expires, 204/500/network keep the page,
// persisted pageshow only, no request on mount or push navigation, listener
// cleanup, late in-flight 401 ignored, explicit base-path URL, stable component
// callback (location.reload), and AppShell opt-in wiring.
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import TestRenderer, { act } from 'react-test-renderer'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime.js'

globalThis.IS_REACT_ACT_ENVIRONMENT = true
const dist = process.env.UI_DIST ?? new URL('../dist', import.meta.url).pathname
const recheckMod = (await import(`${dist}/shell/SessionRecheck.js`)).default ?? {}
const SessionRecheck = recheckMod.default ?? recheckMod
const { useHistorySessionRecheck } = recheckMod
const indexMod = (await import(`${dist}/index.js`)).default ?? {}
const CHECK_URL = '/lifepulse/api/auth/session'
function installWindow() {
  const target = new EventTarget()
  const reloadCalls = []
  target.location = { origin: 'https://app.test', reload: () => { reloadCalls.push(1) } }
  target.history = { pushState: () => undefined }
  const added = []
  const removed = []
  const rawAdd = target.addEventListener.bind(target)
  const rawRemove = target.removeEventListener.bind(target)
  target.addEventListener = (type, listener, options) => { added.push(type); rawAdd(type, listener, options) }
  target.removeEventListener = (type, listener, options) => { removed.push(type); rawRemove(type, listener, options) }
  globalThis.window = target
  return { reloadCalls, added, removed }
}
function installFetch(status) {
  const calls = []
  globalThis.fetch = async (url, init) => { calls.push([url, init]); return { status } }
  return calls
}
function Probe({ url, onExpired }) {
  useHistorySessionRecheck(url, onExpired)
  return null
}
async function mountProbe(url, onExpired) {
  let renderer = null
  await act(async () => { renderer = TestRenderer.create(React.createElement(Probe, { url, onExpired })) })
  return renderer
}
async function flush() {
  await act(async () => { await new Promise((resolve) => { setTimeout(resolve, 0) }) })
}
function popstate() {
  window.dispatchEvent(new Event('popstate'))
}
function pageshow(persisted) {
  const event = new Event('pageshow')
  Object.defineProperty(event, 'persisted', { value: persisted })
  window.dispatchEvent(event)
}
async function unmount(renderer) {
  await act(async () => { renderer.unmount() })
}
assert.equal(typeof SessionRecheck, 'function', 'SessionRecheck component is exported')
assert.equal(typeof useHistorySessionRecheck, 'function', 'useHistorySessionRecheck hook is exported')
assert.equal(indexMod.SessionRecheck, SessionRecheck, 'index re-exports the component')
assert.equal(indexMod.useHistorySessionRecheck, useHistorySessionRecheck, 'index re-exports the hook')
assert.equal(typeof indexMod.AppShell, 'function', 'AppShell is still exported')
for (const [status, expired] of [[401, 1], [204, 0], [500, 0]]) {
  installWindow()
  const calls = installFetch(status)
  let count = 0
  const renderer = await mountProbe(CHECK_URL, () => { count += 1 })
  act(() => { popstate() })
  await flush()
  assert.equal(calls.length, 1, `popstate checks once (status ${status})`)
  assert.deepEqual(calls[0], [CHECK_URL, { cache: 'no-store' }], 'check fetches the explicit base-path URL with no-store')
  assert.equal(count, expired, `status ${status} expires exactly ${expired === 1 ? 'once' : 'never'}`)
  await unmount(renderer)
}
{
  installWindow()
  const calls = []
  globalThis.fetch = async (url, init) => { calls.push([url, init]); throw new TypeError('Failed to fetch') }
  let count = 0
  const renderer = await mountProbe(CHECK_URL, () => { count += 1 })
  act(() => { popstate() })
  await flush()
  assert.equal(calls.length, 1, 'unreachable server still checks once')
  assert.equal(count, 0, 'network errors never expire')
  await unmount(renderer)
}
{
  installWindow()
  const calls = installFetch(401)
  let count = 0
  const renderer = await mountProbe(CHECK_URL, () => { count += 1 })
  act(() => { pageshow(false) })
  await flush()
  assert.equal(calls.length, 0, 'freshly loaded pageshow never checks')
  act(() => { pageshow(true) })
  await flush()
  assert.equal(calls.length, 1, 'bfcache-restored pageshow checks once')
  assert.equal(count, 1, 'persisted pageshow + 401 expires')
  await unmount(renderer)
}
{
  installWindow()
  const calls = installFetch(204)
  let count = 0
  const renderer = await mountProbe(CHECK_URL, () => { count += 1 })
  await flush()
  assert.equal(calls.length, 0, 'mount alone never checks')
  window.history.pushState({}, '', '/other')
  window.dispatchEvent(new Event('hashchange'))
  await flush()
  assert.equal(calls.length, 0, 'push navigation never checks')
  assert.equal(count, 0, 'no check means no expiration')
  await unmount(renderer)
}
{
  const { added, removed } = installWindow()
  const calls = installFetch(401)
  const renderer = await mountProbe(CHECK_URL, () => undefined)
  assert.deepEqual(added, ['popstate', 'pageshow'], 'mount subscribes both listeners')
  await unmount(renderer)
  assert.deepEqual(removed, ['popstate', 'pageshow'], 'unmount removes both listeners')
  act(() => { popstate(); pageshow(true) })
  await flush()
  assert.equal(calls.length, 0, 'no listener means no check after unmount')
}
{
  installWindow()
  const calls = []
  let answer = null
  globalThis.fetch = (url, init) => { calls.push([url, init]); return new Promise((resolve) => { answer = resolve }) }
  let count = 0
  const renderer = await mountProbe(CHECK_URL, () => { count += 1 })
  act(() => { popstate() })
  await unmount(renderer)
  answer({ status: 401 })
  await flush()
  assert.equal(calls.length, 1, 'in-flight check was sent before unmount')
  assert.equal(count, 0, 'late 401 after unmount never expires')
}
{
  const { reloadCalls, added } = installWindow()
  installFetch(401)
  let renderer = null
  await act(async () => { renderer = TestRenderer.create(React.createElement(SessionRecheck, { sessionCheckUrl: CHECK_URL })) })
  assert.equal(renderToStaticMarkup(React.createElement(SessionRecheck, { sessionCheckUrl: CHECK_URL })), '', 'component renders nothing visible')
  await act(async () => { renderer.update(React.createElement(SessionRecheck, { sessionCheckUrl: CHECK_URL })) })
  assert.equal(added.length, 2, 'stable callback survives re-render without resubscribing')
  act(() => { popstate() })
  await flush()
  assert.equal(reloadCalls.length, 1, 'component 401 reloads the page for the server guard')
  await unmount(renderer)
}
{
  const { AppShell } = indexMod
  const withPath = (pathname, el) => React.createElement(PathnameContext.Provider, { value: pathname }, el)
  const body = React.createElement('p', null, 'body')
  const wired = renderToStaticMarkup(withPath('/tasks/42', React.createElement(AppShell, { appName: 'TestApp', apps: [], themeToggle: false, sessionCheckUrl: CHECK_URL }, body)))
  assert.match(wired, /<p>body<\/p>/, 'AppShell with sessionCheckUrl still renders children')
  const bare = renderToStaticMarkup(withPath('/tasks/42', React.createElement(AppShell, { appName: 'TestApp', apps: [], themeToggle: false }, body)))
  assert.match(bare, /<p>body<\/p>/, 'AppShell without sessionCheckUrl still renders children')
  assert.equal(wired, bare, 'opt-in check adds no visible markup until its endpoint lands')
}
console.log('ok — SessionRecheck history-session contract (popstate/pageshow, cleanup, AppShell opt-in)')
