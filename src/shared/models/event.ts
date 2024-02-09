import { EventInterface } from '../interfaces'

export class Event implements EventInterface {
  constructor(
    public title: string,
    public startDate: Date,
    public endDate: Date = new Date(),
  ) {
    this.title = title
    this.startDate = startDate
    this.endDate = endDate
  }
}
