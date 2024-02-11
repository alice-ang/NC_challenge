import { Component } from '@angular/core'
import { TextService } from '../../shared/services/text.service'
import { EventService } from '../../shared/services/event.service'

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  providers: [EventService, TextService],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  constructor(
    public eventService: EventService,
    public textService: TextService,
  ) {}

  get eventValue() {
    return this.eventService.Event
  }

  get countdownValue() {
    return this.eventService.Countdown
  }
}
