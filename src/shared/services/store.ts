import { Injectable, computed, effect, signal } from '@angular/core';
import { EventInterface } from '../interfaces';

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

  countdown = signal<string>('');
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

    effect(() => {
      setInterval(() => {
        this.countdownTimer();
      }, 1000);
    });
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

  countdownTimer = () => {
    const inputDate = new Date(this.event().startDate);
    const currentDate = new Date();

    // Avoid printing NaN
    if (!this.event().startDate) {
      return;
    }
    const timeDifferenceInMilliseconds =
      inputDate.getTime() - currentDate.getTime();
    const timeDifferenceInSeconds = Math.floor(
      Math.abs(timeDifferenceInMilliseconds / 1000)
    );

    const days = Math.floor(timeDifferenceInSeconds / (24 * 60 * 60));
    const hours = Math.floor((timeDifferenceInSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = Math.floor(timeDifferenceInSeconds % 60);

    this.countdown.update(
      (countdown) =>
        (countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
    );
  };
  get Event() {
    return this.event;
  }
  get Countdown() {
    return this.countdown;
  }
}
