import {ITimeService, TimeoutRef, TimeServiceCallback} from './ITimeService'
import {DateTime, Duration, Interval} from 'luxon'

// A time service that loops between a start and an end date, taking a defined period for each loop.
// If this replaces a "proper" time service in the browser then we can test the natural progression of state, but in
// a shorter (or longer!) timescale than normal.
//
// In this class, "external" refers to the times we provide to the user. "internal" refers to the wall clock time, which
// this class uses to generate the fake "external" times.
export class SpeedyTimeService implements ITimeService {
  private readonly externalStart: DateTime
  private readonly periodSeconds: number
  private readonly externalSeconds: number
  private readonly internalStart: DateTime
  private readonly compressionFactor: number

  // startTime and endTime are the external times we want this time service to loop over.
  // periodSeconds is how many seconds it should take to complete one loop.
  constructor(startTime: DateTime, endTime: DateTime, periodSeconds: number) {
    if (endTime <= startTime) {
      throw 'endTime must be after startTime'
    }
    if (periodSeconds <= 0) {
      throw 'periodSeconds must be greater than zero'
    }

    this.externalStart = startTime
    this.periodSeconds = periodSeconds
    this.internalStart = DateTime.now()

    const externalInterval = Interval.fromDateTimes(startTime, endTime)
    this.externalSeconds = externalInterval.length('second')

    this.compressionFactor = periodSeconds / this.externalSeconds
  }

  getJsDate(): Date {
    return this.getLuxonDateTime().toJSDate()
  }

  getLuxonDateTime(): DateTime {
    const secsSinceStart = Interval.fromDateTimes(this.internalStart, DateTime.now()).length('second')
    const periodsSinceStart = secsSinceStart / this.periodSeconds
    const partOfPeriod = periodsSinceStart % 1
    const partialDuration = Duration.fromObject({second: partOfPeriod * this.externalSeconds})

    return this.externalStart.plus(partialDuration)
  }

  setTimeout(callback: TimeServiceCallback, delay: number, ...args: unknown[]): TimeoutRef {
    return setTimeout(callback, delay * this.compressionFactor, ...args)
  }

  clearTimeout(timer: TimeoutRef): void {
    clearTimeout(timer)
  }
}
