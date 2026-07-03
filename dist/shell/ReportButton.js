'use client';
"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReportButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const lucide_react_1 = require("lucide-react");
const Button_1 = __importDefault(require("../components/Button"));
const ReportButton_helpers_1 = require("./ReportButton.helpers");
const ReportButton_drag_1 = require("./ReportButton.drag");
// Shared cross-app issue/enhancement reporter. Rendered by Topbar on every app so
// it appears on every screen. The dialog is a DRAGGABLE, non-dimming floating
// panel (grab the header, move it anywhere) so the reporter can uncover whatever
// they want to screenshot — it never blocks or dims the page. POSTs to a
// basePath-aware same-origin /api/report-issue (see ReportButton.helpers).
function ReportButton({ appName, pageTitle = '', endpoint, }) {
    const [open, setOpen] = (0, react_1.useState)(false);
    const [type, setType] = (0, react_1.useState)('bug');
    const [description, setDescription] = (0, react_1.useState)('');
    const [screenshot, setScreenshot] = (0, react_1.useState)(null);
    const [status, setStatus] = (0, react_1.useState)('');
    const [busy, setBusy] = (0, react_1.useState)(false);
    const pageContext = usePageContext(appName, pageTitle);
    const actions = useReportActions({ description, endpoint, pageContext, screenshot, setBusy, setDescription, setScreenshot, setStatus, type });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Button_1.default, { type: "button", variant: "ghost", size: "sm", leftIcon: lucide_react_1.Bug, onClick: () => { setOpen(true); }, children: "Report" }), open && ((0, jsx_runtime_1.jsx)(ReportPanel, { busy: busy, description: description, onAttach: actions.attachScreenshot, onClose: () => { if (!busy) {
                    setOpen(false);
                } }, onDescription: setDescription, onSubmit: actions.submit, onType: setType, pageContext: pageContext, screenshot: screenshot, status: status, type: type }))] }));
}
function usePageContext(appName, pageTitle) {
    const initialContext = (0, react_1.useMemo)(() => (0, ReportButton_helpers_1.serverPageContext)(appName, pageTitle), [appName, pageTitle]);
    const [pageContext, setPageContext] = (0, react_1.useState)(initialContext);
    (0, react_1.useEffect)(() => { setPageContext((0, ReportButton_helpers_1.currentPageContext)(appName, pageTitle)); }, [appName, pageTitle]);
    return pageContext;
}
function useReportActions({ description, endpoint, pageContext, screenshot, setBusy, setDescription, setScreenshot, setStatus, type, }) {
    return {
        attachScreenshot: () => { void (0, ReportButton_helpers_1.attachScreenshot)({ setBusy, setScreenshot, setStatus }); },
        submit: () => { void (0, ReportButton_helpers_1.submitReport)({ description, endpoint, pageContext, screenshot, setBusy, setDescription, setScreenshot, setStatus, type }); },
    };
}
function ReportPanel({ busy, description, onAttach, onClose, onDescription, onSubmit, onType, pageContext, screenshot, status, type, }) {
    const { pos, dragHandlers } = (0, ReportButton_drag_1.useDrag)();
    const [minimized, setMinimized] = (0, react_1.useState)(false);
    if (typeof document === 'undefined') {
        return null;
    }
    const style = pos !== null ? { left: pos.x, top: pos.y } : { top: '4.5rem', right: '1.5rem' };
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { "data-report-panel": true, className: "fixed z-[100] w-[min(92vw,26rem)] overflow-hidden rounded-lg border border-line bg-surface shadow-2xl", style: style, role: "dialog", "aria-label": "Report page", children: [(0, jsx_runtime_1.jsxs)("div", { ...dragHandlers, className: "flex cursor-move items-center justify-between gap-2 select-none border-b border-line bg-surface-muted px-3 py-2 touch-none", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2 text-sm font-semibold text-ink", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.GripHorizontal, { className: "h-4 w-4 text-muted" }), "Report Page"] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(IconButton, { icon: minimized ? lucide_react_1.Square : lucide_react_1.Minus, label: minimized ? 'Expand' : 'Minimize', onClick: () => { setMinimized((value) => !value); } }), (0, jsx_runtime_1.jsx)(IconButton, { icon: lucide_react_1.X, label: "Close", onClick: onClose, disabled: busy })] })] }), !minimized && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 p-4 text-sm", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Drag the header to move this panel aside \u2014 the page stays visible so you can point at what you're reporting." }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [(0, jsx_runtime_1.jsx)(ReportTypeButton, { active: type === 'bug', icon: lucide_react_1.AlertTriangle, label: "Issue", onClick: () => { onType('bug'); } }), (0, jsx_runtime_1.jsx)(ReportTypeButton, { active: type === 'enhancement', icon: lucide_react_1.Lightbulb, label: "Enhancement", onClick: () => { onType('enhancement'); } })] }), (0, jsx_runtime_1.jsx)(ReportDetails, { value: description, onChange: onDescription }), (0, jsx_runtime_1.jsx)(ReportPageContext, { pageContext: pageContext }), (0, jsx_runtime_1.jsx)(ReportActions, { busy: busy, canSubmit: description.trim().length >= 3, hasScreenshot: screenshot !== null, onAttach: onAttach, onSubmit: onSubmit }), status.length > 0 && (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: status })] }))] }), document.body);
}
function IconButton({ icon: Icon, label, onClick, disabled }) {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, title: label, onClick: onClick, disabled: disabled, className: "rounded-md p-1 text-muted transition hover:bg-surface hover:text-ink disabled:opacity-50", children: (0, jsx_runtime_1.jsx)(Icon, { className: "h-4 w-4" }) }));
}
function ReportTypeButton({ active, icon: Icon, label, onClick }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: onClick, className: `inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${active
            ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-200'
            : 'border-line bg-surface text-ink hover:bg-surface-muted'}`, children: [(0, jsx_runtime_1.jsx)(Icon, { className: "h-4 w-4" }), label] }));
}
function ReportDetails({ value, onChange }) {
    return ((0, jsx_runtime_1.jsxs)("label", { className: "label", children: ["Details", (0, jsx_runtime_1.jsx)("textarea", { className: "input min-h-28", value: value, onChange: (event) => { onChange(event.target.value); }, maxLength: 4000, placeholder: "What is wrong or needed?" })] }));
}
function ReportPageContext({ pageContext }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-md border border-line bg-surface-muted p-3 text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("div", { children: pageContext.pathname }), (0, jsx_runtime_1.jsx)("div", { children: pageContext.codePath })] }));
}
function ReportActions({ busy, canSubmit, hasScreenshot, onAttach, onSubmit }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [(0, jsx_runtime_1.jsx)(Button_1.default, { type: "button", variant: "outline", size: "sm", leftIcon: lucide_react_1.Camera, onClick: onAttach, disabled: busy, children: hasScreenshot ? 'Replace' : 'Screenshot' }), (0, jsx_runtime_1.jsx)(Button_1.default, { type: "button", variant: "primary", size: "sm", leftIcon: lucide_react_1.Send, onClick: onSubmit, disabled: busy || !canSubmit, children: "File task" })] }));
}
