import {DateTime, Duration, Interval} from 'luxon'
import {ICurrentTimeStrategy} from '../interfaces/ICurrentTimeStrategy.js'
import {ISetTimeoutStrategy} from '../interfaces/ISetTimeoutStrategy.js'
import {TimeoutRef, TimeServiceCallback} from '../interfaces/TimeoutTypes.js'

export class CompressedCurrentTimeStrategy implements ICurrentTimeStrategy {
  // startTime and endTime are the external times we want this time service to loop over.
  // periodSeconds is how many seconds it should take to complete one loop.
  private readonly externalStart: DateTime
  private readonly periodSeconds: number
  private readonly externalSeconds: number
  private readonly internalStart: DateTime

  constructor(interval: Interval, periodSeconds: number) {
    if (!interval.isValid || !interval) {
      throw 'Must be a valid interval'
    }
    if (periodSeconds <= 0) {
      throw 'periodSeconds must be greater than zero'
    }

    this.externalStart = interval.start!
    this.periodSeconds = periodSeconds
    this.internalStart = DateTime.now()
    this.externalSeconds = interval.length('second')
  }

  get(): DateTime {
    const secsSinceStart = Interval.fromDateTimes(this.internalStart, DateTime.now()).length('second')
    const periodsSinceStart = secsSinceStart / this.periodSeconds
    const partOfPeriod = periodsSinceStart % 1
    const partialDuration = Duration.fromObject({second: partOfPeriod * this.externalSeconds})

    return this.externalStart.plus(partialDuration)
  }
}

export class CompressedSetTimeoutStrategy implements ISetTimeoutStrategy {
  private readonly compressionFactor: number

  constructor(compressionFactor: number) {
    this.compressionFactor = compressionFactor
  }
  setTimeout(callback: TimeServiceCallback, delay: number, ...args: unknown[]): TimeoutRef {
    return setTimeout(callback, delay * this.compressionFactor, ...args)
  }
}
