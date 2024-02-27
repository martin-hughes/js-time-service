import {DateTime} from 'luxon'
import {ICurrentTimeStrategy} from '../interfaces/ICurrentTimeStrategy.js'

export class StaticCurrentTimeStrategy implements ICurrentTimeStrategy {
  fakeNow: DateTime

  constructor(fakeNow: DateTime) {
    this.fakeNow = fakeNow
  }

  get(): DateTime {
    return this.fakeNow
  }

  set(fakeNow: DateTime) {
    this.fakeNow = fakeNow
  }
}
