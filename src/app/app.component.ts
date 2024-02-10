import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventInputsComponent } from './event-inputs/event-inputs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventComponent, EventInputsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
