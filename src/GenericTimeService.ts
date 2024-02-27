import {DateTime} from 'luxon'
import {IClearTimeoutStrategy} from './interfaces/IClearTimeoutStrategy.js'
import {ICurrentTimeStrategy} from './interfaces/ICurrentTimeStrategy.js'
import {ISetTimeoutStrategy} from './interfaces/ISetTimeoutStrategy.js'
import {ITimeService} from './interfaces/ITimeService.js'
import {TimeoutRef, TimeServiceCallback} from './interfaces/TimeoutTypes.js'

export class GenericTimeService implements ITimeService {
  readonly currentTimeStrategy: ICurrentTimeStrategy
  readonly setTimeoutStrategy: ISetTimeoutStrategy
  readonly clearTimeoutStrategy: IClearTimeoutStrategy

  constructor(
    currentTimeStrategy: ICurrentTimeStrategy,
    setTimeoutStrategy: ISetTimeoutStrategy,
    clearTimeoutStrategy: IClearTimeoutStrategy,
  ) {
    this.currentTimeStrategy = currentTimeStrategy
    this.setTimeoutStrategy = setTimeoutStrategy
    this.clearTimeoutStrategy = clearTimeoutStrategy
  }

  setTimeout(callback: TimeServiceCallback, delay: number, ...args: unknown[]): TimeoutRef {
    return this.setTimeoutStrategy.setTimeout(callback, delay, ...args)
  }

  clearTimeout(timer: TimeoutRef): void {
    this.clearTimeoutStrategy.clear(timer)
  }

  getJsDate(): Date {
    return this.getLuxonDateTime().toJSDate()
  }

  getLuxonDateTime(): DateTime {
    return this.currentTimeStrategy.get()
  }
}
