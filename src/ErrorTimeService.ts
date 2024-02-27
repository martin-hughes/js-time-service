import {GenericTimeService} from './GenericTimeService.js'
import {ITimeService} from './interfaces/ITimeService.js'
import {
  ErrorClearTimeoutStrategy,
  ErrorCurrentTimeStrategy,
  ErrorSetTimeoutStrategy,
} from './strategies/ErrorStrategies'

export class ErrorTimeService extends GenericTimeService implements ITimeService {
  constructor(errMsg: string = 'No date available from ErrorTimeService') {
    super(
      new ErrorCurrentTimeStrategy(errMsg),
      new ErrorSetTimeoutStrategy(errMsg),
      new ErrorClearTimeoutStrategy(errMsg),
    )
  }
}
