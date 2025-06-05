/// <reference lib="webworker" />
import { TSPSolverModule } from './modules/TSP-DP';

addEventListener('message', ({ data }) => {
  const { vertices, edges } = data;

  const tspSolver = new TSPSolverModule();
  // console.log('Received vertices:', vertices);
  // console.log('Received edges:', edges);

  const result = tspSolver.calcPath(0, edges);

  postMessage(result);
});
