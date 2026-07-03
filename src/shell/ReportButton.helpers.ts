// Pure (non-React) helpers for the shared ReportButton: page-context inference,
// tab screenshot capture, and posting the report to the same-origin endpoint.
// Split out of ReportButton.tsx to keep that file's JSX under the line cap.

export type ReportType = 'bug' | 'enhancement'
export type PageContext = { appName: string; codePath: string; pathname: string; title: string; url: string }

type DisplayCaptureDevices = { getDisplayMedia: (constraints: DisplayMediaStreamOptions) => Promise<MediaStream> }
type ReportResponse = { grooming?: { clarifyingQuestions?: string[]; requiresGrooming?: boolean }; task?: { taskId?: string } }

export function currentPageContext(appName: string, pageTitle: string): PageContext {
  const pathname = window.location.pathname
  return {
    appName,
    codePath: inferCodePath(pathname),
    pathname,
    title: pageTitle.length > 0 ? pageTitle : document.title,
    url: window.location.href,
  }
}

export function serverPageContext(appName: string, pageTitle: string): PageContext {
  return { appName, codePath: 'unknown', pathname: 'unknown', title: pageTitle, url: '' }
}

/**
 * Resolve the same-origin report endpoint as an ABSOLUTE URL that already
 * includes the app's Next.js basePath. Every app namespaces its routes under a
 * basePath (e.g. `/finpulse`), so `/api/report-issue` alone 404s. Next only
 * *sometimes* auto-prefixes basePath onto a client `fetch('/…')`, so we cannot
 * rely on it — instead we read the basePath off a `/_next/` asset URL (always
 * served under basePath) and build the full URL ourselves. An absolute URL is
 * returned so Next's fetch patch cannot double-prefix it.
 */
export function reportEndpoint(explicit?: string): string {
  if (explicit !== undefined && explicit.length > 0) {
    return explicit
  }
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return '/api/report-issue'
  }
  const basePath = detectBasePath()
  return new URL(`${basePath}/api/report-issue`, window.location.origin).href
}

function detectBasePath(): string {
  const script = document.querySelector<HTMLScriptElement>('script[src*="/_next/"]')
  const link = document.querySelector<HTMLLinkElement>('link[href*="/_next/"]')
  const ref = script?.src ?? link?.href
  if (ref === undefined || ref.length === 0) {
    return ''
  }
  try {
    const marker = '/_next/'
    const pathname = new URL(ref, window.location.origin).pathname
    const idx = pathname.indexOf(marker)
    return idx > 0 ? pathname.slice(0, idx) : ''
  } catch {
    return ''
  }
}

function inferCodePath(pathname: string): string {
  const clean = pathname.replace(/^\/+|\/+$/g, '')
  if (clean.length === 0) {
    return 'src/app/page.tsx'
  }
  return `src/app/${clean}/page.tsx`
}

async function captureCurrentTab(): Promise<string | null> {
  const devices = (navigator as unknown as { mediaDevices?: unknown }).mediaDevices
  if (!hasDisplayCapture(devices)) {
    return null
  }
  const stream = await devices.getDisplayMedia({ audio: false, video: true })
  try {
    const video = document.createElement('video')
    video.srcObject = stream
    video.muted = true
    await video.play()
    if (video.videoWidth === 0) {
      await new Promise((resolve) => { video.onloadedmetadata = resolve; })
    }
    const maxWidth = 1280
    const scale = video.videoWidth > maxWidth ? maxWidth / video.videoWidth : 1
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(video.videoWidth * scale))
    canvas.height = Math.max(1, Math.round(video.videoHeight * scale))
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/png')
  } finally {
    for (const track of stream.getTracks()) {
      track.stop()
    }
  }
}

function hasDisplayCapture(value: unknown): value is DisplayCaptureDevices {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  return typeof (value as { getDisplayMedia?: unknown }).getDisplayMedia === 'function'
}

export async function attachScreenshot({ setBusy, setScreenshot, setStatus }: { setBusy: (value: boolean) => void; setScreenshot: (value: string | null) => void; setStatus: (value: string) => void }) {
  setStatus('')
  setBusy(true)
  try {
    const captured = await captureCurrentTab()
    setScreenshot(captured)
    setStatus(captured === null ? 'Screenshot unavailable.' : 'Screenshot attached.')
  } catch {
    setStatus('Screenshot skipped.')
  } finally {
    setBusy(false)
  }
}

export interface FiledResult { taskId: string; hasGroomingQuestions: boolean }

export async function submitReport({ description, endpoint, onFiled, pageContext, screenshot, setBusy, setDescription, setScreenshot, setStatus, type }: { description: string; endpoint?: string; onFiled: (result: FiledResult) => void; pageContext: PageContext; screenshot: string | null; setBusy: (value: boolean) => void; setDescription: (value: string) => void; setScreenshot: (value: string | null) => void; setStatus: (value: string) => void; type: ReportType }) {
  const trimmed = description.trim()
  if (trimmed.length < 3) {
    setStatus('Add a short description.')
    return
  }
  setBusy(true)
  setStatus('Filing…')
  try {
    await postReport({ description: trimmed, endpoint, onFiled, pageContext, screenshot, type, setDescription, setScreenshot, setStatus })
  } catch {
    setStatus('Report failed.')
  } finally {
    setBusy(false)
  }
}

async function postReport({ description, endpoint, onFiled, pageContext, screenshot, setDescription, setScreenshot, setStatus, type }: { description: string; endpoint?: string; onFiled: (result: FiledResult) => void; pageContext: PageContext; screenshot: string | null; setDescription: (value: string) => void; setScreenshot: (value: string | null) => void; setStatus: (value: string) => void; type: ReportType }) {
  const response = await fetch(reportEndpoint(endpoint), { body: JSON.stringify({ description, page: pageContext, screenshotDataUrl: screenshot ?? undefined, type, userAgent: navigator.userAgent }), headers: { 'content-type': 'application/json' }, method: 'POST' })
  if (!response.ok) {
    setStatus('Report failed.')
    return
  }
  const data = await response.json() as ReportResponse
  const taskId = data.task?.taskId ?? 'task'
  const questions = data.grooming?.clarifyingQuestions ?? []
  // Success: clear the form and hand the filed task to the caller, which closes
  // the panel and shows a standalone success toast.
  setStatus('')
  setDescription('')
  setScreenshot(null)
  onFiled({ taskId, hasGroomingQuestions: questions.length > 0 })
}
