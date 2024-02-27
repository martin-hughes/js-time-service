import {DateTime} from 'luxon'
import {IClearTimeoutStrategy} from '../interfaces/IClearTimeoutStrategy.js'
import {ICurrentTimeStrategy} from '../interfaces/ICurrentTimeStrategy.js'
import {ISetTimeoutStrategy} from '../interfaces/ISetTimeoutStrategy.js'
import {TimeoutRef, TimeServiceCallback} from '../interfaces/TimeoutTypes.js'

export class NormalCurrentTimeStrategy implements ICurrentTimeStrategy {
  get(): DateTime {
    return DateTime.now()
  }
}

export class NormalSetTimeoutStrategy implements ISetTimeoutStrategy {
  setTimeout(callback: TimeServiceCallback, delay: number, ...args: unknown[]): TimeoutRef {
    return setTimeout(callback, delay, ...args)
  }
}

export class NormalClearTimeoutStrategy implements IClearTimeoutStrategy {
  clear(timer: TimeoutRef): void {
    clearTimeout(timer)
  }
}
