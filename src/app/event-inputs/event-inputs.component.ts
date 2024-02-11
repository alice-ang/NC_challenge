import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { EventService } from '../../shared/services/event.service'

@Component({
  selector: 'app-event-inputs',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-inputs.component.html',
  styleUrl: './event-inputs.component.scss',
})
export class EventInputsComponent {
  constructor(public eventService: EventService) {}

  setTitle = (eventTitle: string) => {
    this.eventService.setTitle(eventTitle)
  }
  setStartDate = (eventDate: Date) => {
    this.eventService.setStartDate(eventDate)
  }
}
