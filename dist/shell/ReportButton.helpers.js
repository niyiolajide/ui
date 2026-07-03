"use strict";
// Pure (non-React) helpers for the shared ReportButton: page-context inference,
// tab screenshot capture, and posting the report to the same-origin endpoint.
// Split out of ReportButton.tsx to keep that file's JSX under the line cap.
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentPageContext = currentPageContext;
exports.serverPageContext = serverPageContext;
exports.attachScreenshot = attachScreenshot;
exports.submitReport = submitReport;
function currentPageContext(appName, pageTitle) {
    const pathname = window.location.pathname;
    return {
        appName,
        codePath: inferCodePath(pathname),
        pathname,
        title: pageTitle.length > 0 ? pageTitle : document.title,
        url: window.location.href,
    };
}
function serverPageContext(appName, pageTitle) {
    return { appName, codePath: 'unknown', pathname: 'unknown', title: pageTitle, url: '' };
}
function inferCodePath(pathname) {
    const clean = pathname.replace(/^\/+|\/+$/g, '');
    if (clean.length === 0) {
        return 'src/app/page.tsx';
    }
    return `src/app/${clean}/page.tsx`;
}
async function captureCurrentTab() {
    const devices = navigator.mediaDevices;
    if (!hasDisplayCapture(devices)) {
        return null;
    }
    const stream = await devices.getDisplayMedia({ audio: false, video: true });
    try {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.muted = true;
        await video.play();
        if (video.videoWidth === 0) {
            await new Promise((resolve) => { video.onloadedmetadata = resolve; });
        }
        const maxWidth = 1280;
        const scale = video.videoWidth > maxWidth ? maxWidth / video.videoWidth : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
        canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/png');
    }
    finally {
        for (const track of stream.getTracks()) {
            track.stop();
        }
    }
}
function hasDisplayCapture(value) {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    return typeof value.getDisplayMedia === 'function';
}
async function attachScreenshot({ setBusy, setScreenshot, setStatus }) {
    setStatus('');
    setBusy(true);
    try {
        const captured = await captureCurrentTab();
        setScreenshot(captured);
        setStatus(captured === null ? 'Screenshot unavailable.' : 'Screenshot attached.');
    }
    catch {
        setStatus('Screenshot skipped.');
    }
    finally {
        setBusy(false);
    }
}
async function submitReport({ description, endpoint, pageContext, screenshot, setBusy, setDescription, setScreenshot, setStatus, type }) {
    const trimmed = description.trim();
    if (trimmed.length < 3) {
        setStatus('Add a short description.');
        return;
    }
    setBusy(true);
    setStatus('');
    try {
        await postReport({ description: trimmed, endpoint, pageContext, screenshot, type, setDescription, setScreenshot, setStatus });
    }
    catch {
        setStatus('Report failed.');
    }
    finally {
        setBusy(false);
    }
}
async function postReport({ description, endpoint, pageContext, screenshot, setDescription, setScreenshot, setStatus, type }) {
    const response = await fetch(endpoint, { body: JSON.stringify({ description, page: pageContext, screenshotDataUrl: screenshot ?? undefined, type, userAgent: navigator.userAgent }), headers: { 'content-type': 'application/json' }, method: 'POST' });
    if (!response.ok) {
        setStatus('Report failed.');
        return;
    }
    const data = await response.json();
    const taskId = data.task?.taskId ?? 'task';
    const questions = data.grooming?.clarifyingQuestions ?? [];
    setStatus(questions.length > 0 ? `${taskId} filed with grooming questions.` : `${taskId} filed.`);
    setDescription('');
    setScreenshot(null);
}
