import { Component, Input, signal } from '@angular/core';
import { Event } from '../../shared/models/event';
import { EventInterface } from '../../shared/interfaces';
import { Store } from '../../shared/services/store';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  constructor(public store: Store) {}

  get eventValue() {
    return this.store.event;
  }

  get countdownValue() {
    return this.store.Countdown;
  }
}
