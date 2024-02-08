import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Event } from '../../shared/models/event';

@Component({
  selector: 'app-event-inputs',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-inputs.component.html',
  styleUrl: './event-inputs.component.scss',
})
export class EventInputsComponent {
  newEvent: Event = new Event('', new Date());
  @Output() emitEvent = new EventEmitter<Event>();

  setTitle = (eventTitle: string) => {
    this.newEvent.title = eventTitle;
    this.emitEvent.emit(this.newEvent);
  };
  setStartDate = (eventStart: string) => {
    this.newEvent.startDate = new Date(eventStart);
    this.emitEvent.emit(this.newEvent);
  };
}
