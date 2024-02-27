import {DateTime} from 'luxon'

export interface ICurrentTimeStrategy {
  get(): DateTime
}
