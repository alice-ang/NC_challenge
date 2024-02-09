import { Injectable, effect, signal } from '@angular/core';
import { EventInterface } from '../interfaces';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class Store {
  //   storedEvent: EventInterface = JSON.parse(
  //     localStorage.getItem('savedEvent') || "{title: '',startDate: new Date(),}"
  //   );

  event = signal<EventInterface>({
    title: '',
    startDate: new Date(),
  });

  constructor() {
    if (
      typeof localStorage !== 'undefined' &&
      localStorage.getItem('savedEvent') !== null
    ) {
      this.event.set(
        JSON.parse(
          localStorage.getItem('savedEvent') ||
            "{title: '',startDate: new Date(),}"
        )
      );
    } else {
      console.log('Web Storage is not supported in this environment.');
    }

    // Update local storage when event details changes
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('savedEvent', JSON.stringify(this.event()));
        console.log('save to storafe');
      } else {
        console.log('Web Storage is not supported in this environment.');
      }
    });

    // effect((onCleanup) => {
    //   const timer = setInterval(() => {
    //     const currentDate = new Date();
    //     const timeDifferenceInMilliseconds =
    //       this.event().startDate.getTime() - currentDate.getTime();
    //     const timeDifferenceInSeconds = Math.floor(
    //       Math.abs(timeDifferenceInMilliseconds / 1000)
    //     );

    //     const days = Math.floor(timeDifferenceInSeconds / (24 * 60 * 60));
    //     const hours = Math.floor(
    //       (timeDifferenceInSeconds % (24 * 60 * 60)) / 3600
    //     );
    //     const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    //     const seconds = Math.floor(timeDifferenceInSeconds % 60);

    //     return {
    //       days,
    //       hours,
    //       minutes,
    //       seconds,
    //     };
    //   }, 1000);

    //   onCleanup(() => {
    //     clearTimeout(timer);
    //   });
    // });
  }

  setTitle(newTitle: string) {
    this.event.update((event) => ({
      title: newTitle,
      startDate: event.startDate,
    }));
  }

  setStartDate(newDate: Date) {
    this.event.update((event) => ({
      title: event.title,
      startDate: newDate,
    }));
  }

  get Event() {
    return this.event;
  }
}
