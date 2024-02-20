import {ITimeService, TimeoutRef, TimeServiceCallback} from './ITimeService'
import {DateTime} from 'luxon'

export class BrowserTimeService implements ITimeService {
  getJsDate(): Date {
    return new Date()
  }

  getLuxonDateTime(): DateTime {
    return DateTime.now()
  }

  setTimeout(callback: TimeServiceCallback, delay: number, ...args: unknown[]): TimeoutRef {
    return setTimeout(callback, delay, ...args)
  }

  clearTimeout(timer: TimeoutRef): void {
    clearTimeout(timer)
  }
}
