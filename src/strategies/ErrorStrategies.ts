import {DateTime} from 'luxon'
import {IClearTimeoutStrategy} from '../interfaces/IClearTimeoutStrategy.js'
import {ICurrentTimeStrategy} from '../interfaces/ICurrentTimeStrategy.js'
import {ISetTimeoutStrategy} from '../interfaces/ISetTimeoutStrategy.js'
import {TimeoutRef, TimeServiceCallback} from '../interfaces/TimeoutTypes.js'

const defaultErrorMessage = 'No time data available'

export class ErrorCurrentTimeStrategy implements ICurrentTimeStrategy {
  private readonly errorMessage: string

  constructor(errorMessage: string = defaultErrorMessage) {
    this.errorMessage = errorMessage
  }

  get(): DateTime {
    throw this.errorMessage
  }
}

export class ErrorSetTimeoutStrategy implements ISetTimeoutStrategy {
  private readonly errorMessage: string

  constructor(errorMessage: string = defaultErrorMessage) {
    this.errorMessage = errorMessage
  }

  setTimeout(_c: TimeServiceCallback, _d: number, _a: unknown): TimeoutRef {
    throw this.errorMessage
  }
}

export class ErrorClearTimeoutStrategy implements IClearTimeoutStrategy {
  private readonly errorMessage: string

  constructor(errorMessage: string = defaultErrorMessage) {
    this.errorMessage = errorMessage
  }

  clear(_: TimeoutRef): void {
    throw this.errorMessage
  }
}
