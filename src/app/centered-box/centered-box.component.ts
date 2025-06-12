import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TSPSolverModule } from '../modules/TSP-DP';

@Component({
  selector: 'app-centered-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './centered-box.component.html',
  styleUrls: ['./centered-box.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CenteredBoxComponent {
  // Array to hold the vertices (points) of the graph
  vertices: { x: number; y: number }[] = [];

  // Graph edges represented as an adjacency matrix
  edges: number[][] = [];

  // Lines to draw the optimal path
  lines: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }[] = [];

  // TSP solver instance
  solver = new TSPSolverModule();

  // Store the optimal path as an array of vertex indices
  optimalPath: number[] | null = null;

  // Optimal cost of the path
  minCost: number | null = null;

  // Coordinates of the preview vertex
  previewVertex = { x: 0, y: 0 };

  // Flag to show or hide the preview vertex
  showPreviewVertex = false;

  // Flag to indicate whether a calculation is in progress
  isCalculating = false;

  constructor(private http: HttpClient) {}

  /**
   *
   */
  canPlaceVertex(): boolean {
    if (this.isCalculating) return false;
    if (this.vertices.length > 19) return false;
    return true;
  }
  /**
   * Handles vertex placement when the user clicks on the canvas.
   * @param event Mouse event containing the click coordinates.
   */
  onClick(event: MouseEvent) {
    if (!this.canPlaceVertex()) return;
    this.lines = [];
    this.vertices.push({ x: event.clientX, y: event.clientY });
    this.optimalPath = null;
  }

  /**
   * Removes a vertex from the canvas.
   * @param index Index of the vertex to remove.
   * @param event Mouse event to stop propagation.
   */
  removeVertex(index: number, event: MouseEvent) {
    if (this.isCalculating) return;
    this.lines = [];
    event.stopPropagation();
    this.vertices.splice(index, 1);
    this.optimalPath = null;
  }

  /**
   * Calculates the Euclidean distance between two vertices.
   * @param v1 First vertex.
   * @param v2 Second vertex.
   * @returns The Euclidean distance between v1 and v2.
   */
  calculateDistance(
    v1: { x: number; y: number },
    v2: { x: number; y: number }
  ): number {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Clears all vertices and paths from the canvas.
   */
  onClear() {
    this.lines = [];
    this.vertices = [];
    this.optimalPath = null;
  }

  /**
   * Calculates the optimal path using a Web Worker.
   */
  async onCalculate() {
    if (this.vertices.length < 2) {
      alert('Please add at least two vertices.');
      return;
    }

    this.isCalculating = true;

    // Construct the adjacency matrix
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

    if (this.vertices.length <= 18) {
      // TEMPORARILY DISABLED (this.vertices.length <= 15) {
      console.log('Using Web Worker for TSP calculation');
      const worker = new Worker(
        new URL('../solver.worker.ts', import.meta.url)
      );
      worker.postMessage({ vertices: this.vertices, edges: this.edges });

      worker.onmessage = ({ data }) => {
        this.minCost = data.cost;
        this.optimalPath = data.path;
        console.log('Optimal cost:', this.minCost);
        console.log('Optimal path:', this.optimalPath);

        this.calcPathLines();
        this.isCalculating = false;
        worker.terminate();
      };

      worker.onerror = (error) => {
        console.error('Error in web worker:', error);
        this.isCalculating = false;
        worker.terminate();
      };
    } else {
      // Call the Flask backend
      const apiUrl = 'https://euclidean-tsp-solver-1.onrender.com';
      this.http
        .post(apiUrl, { vertices: this.vertices, edges: this.edges })
        .subscribe({
          next: (result: any) => {
            this.minCost = result.cost;
            this.optimalPath = result.path;
            console.log('Optimal cost:', this.minCost);
            console.log('Optimal path:', this.optimalPath);

            this.calcPathLines();
            this.isCalculating = false;
          },
          error: (error) => {
            console.error('Error calling Flask backend:', error);
            this.isCalculating = false;
          },
        });
    }
  }

  /**
   * Generates the lines for drawing the optimal path.
   */
  calcPathLines(): void {
    this.lines = [];
    if (!this.optimalPath || this.optimalPath.length < 2) return;

    for (let i = 0; i < this.optimalPath.length - 1; i++) {
      const startIdx = this.optimalPath[i];
      const endIdx = this.optimalPath[i + 1];
      const start = this.vertices[startIdx];
      const end = this.vertices[endIdx];
      this.lines.push({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
      });
    }
  }

  /**
   * Handles the preview vertex when the mouse moves over the canvas.
   * @param event Mouse event containing the cursor position.
   */
  onMouseMove(event: MouseEvent): void {
    if (!this.canPlaceVertex()) return;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.previewVertex.x = event.clientX;
    this.previewVertex.y = event.clientY;
    this.showPreviewVertex = true;
  }

  /**
   * Hides the preview vertex.
   */
  hidePreviewVertex(): void {
    this.showPreviewVertex = false;
  }
}
