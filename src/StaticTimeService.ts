import {ITimeService, TimeoutRef, TimeServiceCallback} from './ITimeService'
import {DateTime} from 'luxon'

export class StaticTimeService implements ITimeService {
  fakeNow: DateTime

  constructor(fakeNow: DateTime) {
    this.fakeNow = fakeNow
  }

  getJsDate(): Date {
    return this.fakeNow.toJSDate()
  }

  getLuxonDateTime(): DateTime {
    return this.fakeNow
  }

  setNow(fakeNow: DateTime) {
    this.fakeNow = fakeNow
  }

  setTimeout(_callback: TimeServiceCallback, _delay: number, ..._args: unknown[]): TimeoutRef {
    throw 'Timeouts not supported in StaticTimeService'
  }

  clearTimeout(_timer: TimeoutRef): void {
    throw 'Timeouts not supported in StaticTimeService'
  }
}
