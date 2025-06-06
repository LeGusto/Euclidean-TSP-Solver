export class TSPSolverModule {
  // Dynamic programming table to store minimum costs
  // dp[mask][curr]: Minimum cost to visit nodes in the mask ending at 'curr'
  dp: number[][] = [];

  // Path table to reconstruct the optimal path
  // path[mask][curr]: Previous node before reaching 'curr' in 'mask'
  path: number[][] = [];

  /**
   * Calculates the optimal path for the Traveling Salesman Problem (TSP).
   * @param start Starting node for the tour.
   * @param adjMatrix Adjacency matrix representing the graph.
   * @returns An object containing the minimum cost and the optimal path.
   */
  calcPath(start: number, adjMatrix: number[][]) {
    // Validate the starting node
    if (start >= adjMatrix.length || start < 0) {
      throw new Error('Invalid starting node');
    }

    // Initialization of DP and path tables
    this.dp = Array.from({ length: 1 << adjMatrix.length }, () =>
      Array(adjMatrix.length).fill(Infinity)
    );
    this.path = Array.from({ length: 1 << adjMatrix.length }, () =>
      Array(adjMatrix.length).fill(-1)
    );

    // Set the cost of starting at the 'start' node to 0
    this.dp[1 << start][start] = 0;

    // Dynamic programming calculation
    for (let mask = 0; mask < 1 << adjMatrix.length; mask++) {
      for (let curr = 0; curr < adjMatrix.length; curr++) {
        // Skip invalid states
        if (this.dp[mask][curr] === Infinity) continue;

        // Try visiting all unvisited nodes
        for (let bit = 0; bit < adjMatrix.length; bit++) {
          // Skip nodes that have been already visited or unreachable
          if ((mask & (1 << bit)) !== 0 || adjMatrix[curr][bit] === Infinity)
            continue;

          // Update the DP table if a cheaper cost is found
          if (
            this.dp[mask | (1 << bit)][bit] >
            this.dp[mask][curr] + adjMatrix[curr][bit]
          ) {
            this.dp[mask | (1 << bit)][bit] =
              this.dp[mask][curr] + adjMatrix[curr][bit];
            this.path[mask | (1 << bit)][bit] = curr;
          }
        }
      }
    }

    // Find the minimum cost to complete the tour
    let minCost = Infinity;
    let cr = -1; // Current node
    let mask = (1 << adjMatrix.length) - 1; // Mask representing all nodes visited

    for (let i = 0; i < adjMatrix.length; i++) {
      if (i === start) continue; // Skip the starting node
      if (minCost > this.dp[mask][i]) {
        minCost = this.dp[mask][i];
        cr = i; // Update the current node
      }
    }

    // If no valid tour is found, return early
    if (minCost === Infinity) {
      console.log('Cannot construct a valid tour');
      return;
    }

    // Reconstruct the optimal path
    let rtPath: number[] = [];
    while (cr !== -1) {
      rtPath.push(cr); // Add the current node to the path
      let prv = cr; // Store the previous node
      cr = this.path[mask][cr]; // Move to the previous node
      mask ^= 1 << prv; // Remove the current node from the mask
    }

    rtPath.reverse(); // Reverse the path to get the correct order

    // Log the results (debug)
    // console.log('Minimum Cost: ', minCost);
    // console.log('Path: ', rtPath);

    // Return the minimum cost and the optimal path
    return { cost: minCost, path: rtPath };
  }
}
