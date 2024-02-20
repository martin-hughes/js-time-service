import {DateTime} from 'luxon'
import {ITimeService, TimeServiceCallback, TimeoutRef} from './ITimeService'

export class ErrorTimeService implements ITimeService {
  readonly errMsg: string

  constructor(errMsg: string = 'No date available from ErrorTimeService') {
    this.errMsg = errMsg
  }
  getJsDate(): Date {
    throw this.errMsg
  }

  getLuxonDateTime(): DateTime {
    throw this.errMsg
  }

  setTimeout(_callback: TimeServiceCallback, _delay: number, ..._args: unknown[]): TimeoutRef {
    throw this.errMsg
  }

  clearTimeout(_timer: TimeoutRef): void {
    throw this.errMsg
  }
}
