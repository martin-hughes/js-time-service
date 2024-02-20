import {SpeedyTimeService} from '../src/SpeedyTimeService.js'
import {DateTime} from 'luxon'

const startDate = DateTime.fromObject({year: 2024, month: 1, day: 12, hour: 10, minute: 0}, {zone: 'UTC'})
const endDate = DateTime.fromObject({year: 2024, month: 1, day: 12, hour: 12, minute: 0}, {zone: 'UTC'})
const period = 30

const timeService = new SpeedyTimeService(startDate, endDate, period)

function cb() {
  console.log(timeService.getLuxonDateTime().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS))
  timeService.setTimeout(cb, 60000)
}

timeService.setTimeout(cb, 60000)
