import {GenericTimeService} from './GenericTimeService.js'
import {ITimeService} from './interfaces/ITimeService.js'
import {
  NormalClearTimeoutStrategy,
  NormalCurrentTimeStrategy,
  NormalSetTimeoutStrategy,
} from './strategies/NormalStrategies.js'

export class NormalTimeService extends GenericTimeService implements ITimeService {
  constructor() {
    super(new NormalCurrentTimeStrategy(), new NormalSetTimeoutStrategy(), new NormalClearTimeoutStrategy())
  }
}
