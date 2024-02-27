import {DateTime} from 'luxon'
import {ClearTimeoutType, SetTimeoutType} from './TimeoutTypes.js'

export interface ITimeService {
  getJsDate(): Date
  getLuxonDateTime(): DateTime
  setTimeout: SetTimeoutType
  clearTimeout: ClearTimeoutType
}
