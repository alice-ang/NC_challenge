import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Event } from '../../shared/models/event';
import { Store } from '../../shared/services/store';

@Component({
  selector: 'app-event-inputs',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-inputs.component.html',
  styleUrl: './event-inputs.component.scss',
})
export class EventInputsComponent {
  constructor(public store: Store) {}

  setTitle = (eventTitle: string) => {
    this.store.setTitle(eventTitle);
  };
  setStartDate = (eventDate: Date) => {
    this.store.setStartDate(eventDate);
  };
}
