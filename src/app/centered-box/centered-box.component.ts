// Update the component
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TSPSolverModule } from '../modules/TSP-DP';

@Component({
  selector: 'app-centered-box',
  imports: [CommonModule],
  templateUrl: './centered-box.component.html',
  styleUrls: ['./centered-box.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CenteredBoxComponent {
  lastClickPosition = { x: 0, y: 0 };
  vertices: { x: number; y: number }[] = [];
  edges: number[][] = [];
  solver = new TSPSolverModule();
  optimalPath: number[] | null = null;
  minCost: number | null = null;

  onClick(event: MouseEvent) {
    this.lastClickPosition = { x: event.clientX, y: event.clientY };
    this.vertices.push({ ...this.lastClickPosition });
    this.optimalPath = null;
  }

  removeVertex(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.vertices.splice(index, 1);
    this.optimalPath = null;
  }

  calculateDistance(
    v1: { x: number; y: number },
    v2: { x: number; y: number }
  ): number {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  onCalculate() {
    if (this.vertices.length < 2) {
      alert('Please add at least two vertices.');
      return;
    }

    const n = this.vertices.length;
    this.edges = Array.from({ length: n }, () => Array(n).fill(Infinity));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        this.edges[i][j] = this.calculateDistance(
          this.vertices[i],
          this.vertices[j]
        );
      }
    }

    const result = this.solver.calcPath(0, this.edges);
    if (result) {
      this.minCost = result.cost;
      this.optimalPath = result.path;
      console.log('Optimal cost:', this.minCost);
      console.log('Optimal path:', this.optimalPath);
    }
  }

  getPathLines(): { x1: number; y1: number; x2: number; y2: number }[] {
    if (!this.optimalPath || this.optimalPath.length < 2) return [];

    const lines = [];
    for (let i = 0; i < this.optimalPath.length - 1; i++) {
      const startIdx = this.optimalPath[i];
      const endIdx = this.optimalPath[i + 1];
      const start = this.vertices[startIdx];
      const end = this.vertices[endIdx];
      lines.push({ x1: start.x, y1: start.y, x2: end.x, y2: end.y });
    }
    return lines;
  }
}
