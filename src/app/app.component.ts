import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventInputsComponent } from './event-inputs/event-inputs.component';
import { Event } from '../shared/models/event';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventComponent, EventInputsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentEvent: Event = new Event('', new Date());

  setNewEvent(newEvent: Event) {
    this.currentEvent = newEvent;
  }
}
