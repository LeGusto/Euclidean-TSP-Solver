import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-centered-box',
  imports: [CommonModule],
  templateUrl: './centered-box.component.html',
  styleUrl: './centered-box.component.css',
})
export class CenteredBoxComponent {
  lastClickPosition = { x: 0, y: 0 };

  onClick(event: MouseEvent) {
    this.lastClickPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    console.log('Clicked at:', this.lastClickPosition);
  }
}
