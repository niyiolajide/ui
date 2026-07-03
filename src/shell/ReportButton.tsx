'use client'

import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Bug, Camera, Lightbulb, Send, type LucideIcon } from 'lucide-react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import {
  attachScreenshot,
  currentPageContext,
  serverPageContext,
  submitReport,
  type PageContext,
  type ReportType,
} from './ReportButton.helpers'

// Shared cross-app issue/enhancement reporter. Rendered by Topbar on every app so
// it appears on every screen. POSTs to a same-origin `/api/report-issue` route,
// which each app implements (the hub files directly; sibling apps forward the
// user's pulse-token to the hub). Lifted from controlplane IssueReportButton
// (TASK-0471) into @niyi/ui under TASK-0516 so it is no longer ControlPlane-only.

export default function ReportButton({
  appName,
  pageTitle = '',
  endpoint,
}: {
  appName: string
  /** Optional human page title included with the report. Defaults to the document title at submit time. */
  pageTitle?: string
  /** Override the report endpoint. Defaults to a basePath-aware same-origin
   *  `/api/report-issue` resolved at submit time (see reportEndpoint). */
  endpoint?: string
}) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<ReportType>('bug')
  const [description, setDescription] = useState('')
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const pageContext = usePageContext(appName, pageTitle)
  const actions = useReportActions({ description, endpoint, pageContext, screenshot, setBusy, setDescription, setScreenshot, setStatus, type })

  return (
    <>
      <Button type="button" variant="ghost" size="sm" leftIcon={Bug} onClick={() => { setOpen(true); }}>
        Report
      </Button>
      <ReportDialog
        busy={busy}
        description={description}
        onAttach={actions.attachScreenshot}
        onClose={() => { if (!busy) { setOpen(false); } }}
        onDescription={setDescription}
        onSubmit={actions.submit}
        onType={setType}
        open={open}
        pageContext={pageContext}
        screenshot={screenshot}
        status={status}
        type={type}
      />
    </>
  )
}

function usePageContext(appName: string, pageTitle: string): PageContext {
  const initialContext = useMemo(() => serverPageContext(appName, pageTitle), [appName, pageTitle])
  const [pageContext, setPageContext] = useState<PageContext>(initialContext)
  useEffect(() => { setPageContext(currentPageContext(appName, pageTitle)); }, [appName, pageTitle])
  return pageContext
}

function useReportActions({
  description,
  endpoint,
  pageContext,
  screenshot,
  setBusy,
  setDescription,
  setScreenshot,
  setStatus,
  type,
}: {
  description: string
  endpoint?: string
  pageContext: PageContext
  screenshot: string | null
  setBusy: (value: boolean) => void
  setDescription: (value: string) => void
  setScreenshot: (value: string | null) => void
  setStatus: (value: string) => void
  type: ReportType
}) {
  return {
    attachScreenshot: () => { void attachScreenshot({ setBusy, setScreenshot, setStatus }); },
    submit: () => { void submitReport({ description, endpoint, pageContext, screenshot, setBusy, setDescription, setScreenshot, setStatus, type }); },
  }
}

function ReportDialog({
  busy,
  description,
  onAttach,
  onClose,
  onDescription,
  onSubmit,
  onType,
  open,
  pageContext,
  screenshot,
  status,
  type,
}: {
  busy: boolean
  description: string
  onAttach: () => void
  onClose: () => void
  onDescription: (value: string) => void
  onSubmit: () => void
  onType: (value: ReportType) => void
  open: boolean
  pageContext: PageContext
  screenshot: string | null
  status: string
  type: ReportType
}) {
  return (
    <Modal open={open} onClose={onClose} title="Report Page" loading={busy}>
      <div className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <ReportTypeButton active={type === 'bug'} icon={AlertTriangle} label="Issue" onClick={() => { onType('bug'); }} />
          <ReportTypeButton active={type === 'enhancement'} icon={Lightbulb} label="Enhancement" onClick={() => { onType('enhancement'); }} />
        </div>
        <ReportDetails value={description} onChange={onDescription} />
        <ReportPageContext pageContext={pageContext} />
        <ReportActions busy={busy} canSubmit={description.trim().length >= 3} hasScreenshot={screenshot !== null} onAttach={onAttach} onSubmit={onSubmit} />
        {status.length > 0 && <p className="text-xs text-muted">{status}</p>}
      </div>
    </Modal>
  )
}

function ReportTypeButton({ active, icon: Icon, label, onClick }: { active: boolean; icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
        active
          ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-200'
          : 'border-line bg-surface text-ink hover:bg-surface-muted'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}

function ReportDetails({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="label">
      Details
      <textarea className="input min-h-28" value={value} onChange={(event) => { onChange(event.target.value); }} maxLength={4000} placeholder="What is wrong or needed?" />
    </label>
  )
}

function ReportPageContext({ pageContext }: { pageContext: PageContext }) {
  return (
    <div className="rounded-md border border-line bg-surface-muted p-3 text-xs text-muted">
      <div>{pageContext.pathname}</div>
      <div>{pageContext.codePath}</div>
    </div>
  )
}

function ReportActions({ busy, canSubmit, hasScreenshot, onAttach, onSubmit }: { busy: boolean; canSubmit: boolean; hasScreenshot: boolean; onAttach: () => void; onSubmit: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Button type="button" variant="outline" size="sm" leftIcon={Camera} onClick={onAttach} disabled={busy}>
        {hasScreenshot ? 'Replace' : 'Screenshot'}
      </Button>
      <Button type="button" variant="primary" size="sm" leftIcon={Send} onClick={onSubmit} disabled={busy || !canSubmit}>
        File task
      </Button>
    </div>
  )
}
