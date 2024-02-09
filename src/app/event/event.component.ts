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

  calculateTimeDifference() {
    const inputDate = new Date(this.store.event().startDate);
    const currentDate = new Date();

    const timeDifferenceInMilliseconds =
      inputDate.getTime() - currentDate.getTime();
    const timeDifferenceInSeconds = Math.floor(
      Math.abs(timeDifferenceInMilliseconds / 1000)
    );

    const days = Math.floor(timeDifferenceInSeconds / (24 * 60 * 60));
    const hours = Math.floor((timeDifferenceInSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = Math.floor(timeDifferenceInSeconds % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
}
