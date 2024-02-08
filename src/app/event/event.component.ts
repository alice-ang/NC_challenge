import { Component, Input } from '@angular/core'
import { Event } from '../../shared/models/event'
import { EventInterface } from '../../shared/interfaces'

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.sass',
})
export class EventComponent {
  @Input() event!: EventInterface

  calculateTimeDifference() {
    const inputDate = new Date(this.event.endDate)
    const currentDate = this.event.startDate

    const timeDifferenceInMilliseconds =
      inputDate.getTime() - currentDate.getTime()
    const timeDifferenceInSeconds = Math.floor(
      Math.abs(timeDifferenceInMilliseconds / 1000),
    )

    const days = Math.floor(timeDifferenceInSeconds / (24 * 60 * 60))
    const hours = Math.floor((timeDifferenceInSeconds % (24 * 60 * 60)) / 3600)
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60)
    const seconds = Math.floor(timeDifferenceInSeconds % 60)

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }
}
