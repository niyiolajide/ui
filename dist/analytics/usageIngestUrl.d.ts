type UsageLocation = Pick<Location, 'origin' | 'protocol' | 'hostname' | 'port'>;
export declare function resolveUsageIngestUrl(ingestPath: string | undefined, location?: UsageLocation): string;
export {};
