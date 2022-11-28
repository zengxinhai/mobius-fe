export type Result<T = unknown> = { ok: true, data: T, error: '' } | { ok: false, data: null, error: string }

