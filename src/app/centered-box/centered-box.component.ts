import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TSPSolverModule } from '../modules/TSP-DP';

@Component({
  selector: 'app-centered-box',
  imports: [CommonModule],
  templateUrl: './centered-box.component.html',
  styleUrl: './centered-box.component.css',
})
export class CenteredBoxComponent {
  lastClickPosition = { x: 0, y: 0 };

  vertices: { x: number; y: number }[] = [];

  edges: { target: number; cost: number }[][] = [];

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

  // Euclidean distance, squared to avoid floating point precision issues
  calculateDistance(
    vertex1: { x: number; y: number },
    vertex2: { x: number; y: number }
  ): number {
    const dx = vertex1.x - vertex2.x;
    const dy = vertex1.y - vertex2.y;
    return dx * dx + dy * dy;
  }

  onCalculate() {
    if (this.vertices.length < 2) {
      alert('Please add at least two vertices.');
      return;
    }

    this.edges = Array.from({ length: this.vertices.length }, () => []);

    const numVertices = this.vertices.length;

    for (let i = 0; i < numVertices; i++) {
      for (let j = i + 1; j < numVertices; j++) {
        const distance = this.calculateDistance(
          this.vertices[i],
          this.vertices[j]
        );
        this.edges[i].push({
          target: j,
          cost: distance,
        });
      }
    }
  }
}
