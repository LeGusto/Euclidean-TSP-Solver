import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-centered-box',
  imports: [CommonModule],
  templateUrl: './centered-box.component.html',
  styleUrl: './centered-box.component.css',
})
export class CenteredBoxComponent {
  lastClickPosition = { x: 0, y: 0 };

  vertices: { x: number; y: number }[] = [];
  edges = new Map();

  onClick(event: MouseEvent) {
    this.lastClickPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    this.vertices.push(this.lastClickPosition);
  }

  removeVertex(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.vertices.splice(index, 1);
  }
}
