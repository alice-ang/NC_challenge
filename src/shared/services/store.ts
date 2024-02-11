import { Injectable, computed, effect, signal } from '@angular/core'
import { EventInterface } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class Store {
  event = signal<EventInterface>({
    title: '',
    startDate: new Date(),
  })

  countdown = signal<string>('')

  constructor() {
    if (
      typeof localStorage !== 'undefined' &&
      localStorage.getItem('savedEvent') !== null
    ) {
      this.event.set(
        JSON.parse(
          localStorage.getItem('savedEvent') ||
            "{title: '',startDate: new Date(),}",
        ),
      )
    }

    // Update local storage when event details changes
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('savedEvent', JSON.stringify(this.event()))
      }
    })

    effect(() => {
      setInterval(() => {
        this.countdownTimer(this.event().startDate)
      }, 1000)
    })
  }

  setTitle(newTitle: string) {
    this.event.update((event) => ({
      title: newTitle,
      startDate: event.startDate,
    }))
  }

  setStartDate(newDate: Date) {
    this.event.update((event) => ({
      title: event.title,
      startDate: newDate,
    }))
  }

  countdownTimer = (startDate: Date) => {
    const inputDate = new Date(startDate)
    const currentDate = new Date()

    // Avoid printing NaN and dates in the past
    if (!this.event().startDate || inputDate < currentDate) {
      this.countdown.update(
        () => `Please choose a date from today onwards to proceed.`,
      )
      return
    }

    const timeDifferenceInMilliseconds =
      inputDate.getTime() - currentDate.getTime()
    const timeDifferenceInSeconds = Math.floor(
      Math.abs(timeDifferenceInMilliseconds / 1000),
    )

    const days = Math.floor(timeDifferenceInSeconds / (24 * 60 * 60))
    const hours = Math.floor((timeDifferenceInSeconds % (24 * 60 * 60)) / 3600)
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60)
    const seconds = Math.floor(timeDifferenceInSeconds % 60)

    this.countdown.update(
      (countdown) =>
        (countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`),
    )
  }

  // Calculate a view width value based on number of characters in text
  calculateFontSize(textLength: number): string {
    return (100 / textLength) * 1.6 + 'vw'
  }

  get Event() {
    return this.event
  }

  get Countdown() {
    return this.countdown
  }
}
