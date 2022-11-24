export type Result<T> = { ok: true, data: T, error: '' } | { ok: false, data: null, error: string }
export type AsyncResult<T> = Promise<Result<T>>
