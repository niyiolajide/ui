"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveUsageIngestUrl = resolveUsageIngestUrl;
const DEFAULT_INGEST_PATH = '/api/usage';
const LOCAL_CONTROLPLANE_PORT = '4000';
const LOCAL_DIRECT_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', 'host.docker.internal']);
function isLocalDirectAppOrigin(location) {
    return (LOCAL_DIRECT_HOSTS.has(location.hostname.toLowerCase()) &&
        location.port !== '' &&
        location.port !== LOCAL_CONTROLPLANE_PORT);
}
function resolveUsageIngestUrl(ingestPath, location = window.location) {
    const configuredPath = ingestPath ?? DEFAULT_INGEST_PATH;
    try {
        if (ingestPath === undefined && isLocalDirectAppOrigin(location)) {
            const url = new URL(DEFAULT_INGEST_PATH, location.origin);
            url.port = LOCAL_CONTROLPLANE_PORT;
            return url.toString();
        }
        return new URL(configuredPath, location.origin).toString();
    }
    catch {
        return configuredPath;
    }
}
