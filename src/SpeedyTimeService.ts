import {GenericTimeService} from './GenericTimeService.js'
import {ITimeService} from './interfaces/ITimeService.js'
import {DateTime, Interval} from 'luxon'
import {CompressedCurrentTimeStrategy, CompressedSetTimeoutStrategy} from './strategies/CompressedTimeStrategies.js'
import {NormalClearTimeoutStrategy} from './strategies/NormalStrategies.js'

// A time service that loops between a start and an end date, taking a defined period for each loop.
// If this replaces a "proper" time service in the browser then we can test the natural progression of state, but in
// a shorter (or longer!) timescale than normal.
//
// In this class, "external" refers to the times we provide to the user. "internal" refers to the wall clock time, which
// this class uses to generate the fake "external" times.
export class SpeedyTimeService extends GenericTimeService implements ITimeService {
  constructor(startTime: DateTime, endTime: DateTime, periodSeconds: number) {
    if (endTime <= startTime) {
      throw 'endTime must be after startTime'
    }
    if (periodSeconds <= 0) {
      throw 'periodSeconds must be greater than zero'
    }

    const externalInterval = Interval.fromDateTimes(startTime, endTime)
    const externalSeconds = externalInterval.length('second')
    const compressionFactor = periodSeconds / externalSeconds

    super(
      new CompressedCurrentTimeStrategy(externalInterval, periodSeconds),
      new CompressedSetTimeoutStrategy(compressionFactor),
      new NormalClearTimeoutStrategy(),
    )
  }
}
