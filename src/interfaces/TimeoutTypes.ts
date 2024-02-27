// There's probably a better way, but I've struggled to set this to the type of setTimeout parameter 0, so...
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type TimeServiceCallback = (...args: any[]) => void
export type TimeoutRef = ReturnType<typeof setTimeout>

// Write setTimeout as follows because we don't support the util.promisify stuff yet, which `typeof setTimeout` would
// require.
export type SetTimeoutType = (callback: TimeServiceCallback, delay: number, ...args: unknown[]) => TimeoutRef
//export type SetTimeoutType = typeof setTimeout

export type ClearTimeoutType = (timer: TimeoutRef) => void
