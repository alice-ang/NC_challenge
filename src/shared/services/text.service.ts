import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TextService {
  calculateFontSize(textLength: number): string {
    return (100 / (textLength + 8)) * 1.6 + 'vw'
  }
}
