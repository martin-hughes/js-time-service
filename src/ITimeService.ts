import {DateTime} from 'luxon'

// There's probably a better way, but I've struggled to set this to the type of setTimeout parameter 0, so...
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type TimeServiceCallback = (...args: any[]) => void
export type TimeoutRef = ReturnType<typeof setTimeout>

export interface ITimeService {
  getJsDate(): Date
  getLuxonDateTime(): DateTime
  setTimeout(callback: TimeServiceCallback, delay: number, ...args: unknown[]): TimeoutRef
  clearTimeout(timer: TimeoutRef): void
}
