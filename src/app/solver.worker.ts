/// <reference lib="webworker" />
import { TSPSolverModule } from './modules/TSP-DP';

addEventListener('message', ({ data }) => {
  const { vertices, edges } = data;

  const tspSolver = new TSPSolverModule();

  const result = tspSolver.calcPath(0, edges);

  postMessage(result);
});
