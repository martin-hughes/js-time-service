import {GenericTimeService} from './GenericTimeService.js'
import {ITimeService} from './interfaces/ITimeService.js'
import {DateTime} from 'luxon'
import {NormalClearTimeoutStrategy, NormalSetTimeoutStrategy} from './strategies/NormalStrategies.js'
import {StaticCurrentTimeStrategy} from './strategies/StaticTimeStrategies.js'

export class StaticTimeService extends GenericTimeService implements ITimeService {
  private readonly staticCurrentTimeStrategy: StaticCurrentTimeStrategy

  constructor(fakeNow: DateTime) {
    const staticCurrentTimeStrategy = new StaticCurrentTimeStrategy(fakeNow)
    super(staticCurrentTimeStrategy, new NormalSetTimeoutStrategy(), new NormalClearTimeoutStrategy())
    this.staticCurrentTimeStrategy = staticCurrentTimeStrategy
  }

  setNow(fakeNow: DateTime) {
    this.staticCurrentTimeStrategy.set(fakeNow)
  }
}
