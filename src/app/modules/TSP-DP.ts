export class TSPSolverModule {
  dp: number[][] = []; // mask, curr
  path: number[][] = [];

  calcPath(start: number, adjMatrix: number[][]) {
    if (start >= adjMatrix.length || start < 0) {
      throw new Error('Invalid starting node');
    }

    // Initialization
    this.dp = Array.from({ length: 1 << adjMatrix.length }, () =>
      Array(adjMatrix.length).fill(Infinity)
    );
    this.path = Array.from({ length: 1 << adjMatrix.length }, () =>
      Array(adjMatrix.length).fill(-1)
    );
    this.dp[1 << start][start] = 0;

    // Caluclation
    for (let mask = 0; mask < 1 << adjMatrix.length; mask++) {
      for (let curr = 0; curr < adjMatrix.length; curr++) {
        if (this.dp[mask][curr] == -1) continue;

        for (let bit = 0; bit < adjMatrix.length; bit++) {
          if ((mask & (1 << bit)) == 1 || adjMatrix[curr][bit] == -1) continue;

          // console.log(mask, curr, bit)
          if (
            this.dp[mask ^ (1 << bit)][bit] >
            this.dp[mask][curr] + adjMatrix[curr][bit]
          ) {
            this.dp[mask ^ (1 << bit)][bit] =
              this.dp[mask][curr] + adjMatrix[curr][bit];
            this.path[mask ^ (1 << bit)][bit] = curr;
          }
          // console.log(mask ^ (1 << bit), this.dp[mask ^ (1 << bit)][curr])
        }
      }
    }

    let minCost = Infinity;
    let cr = -1;
    let mask = (1 << adjMatrix.length) - 1;

    // Select the cheapest tour
    for (let i = 0; i < adjMatrix.length; i++) {
      if (i == start) continue;
      // console.log((1 << adjMatrix.length) - 1, this.dp[(1 << adjMatrix.length) - 1][i])
      if (minCost > this.dp[(1 << adjMatrix.length) - 1][i]) {
        minCost = this.dp[(1 << adjMatrix.length) - 1][i];
        cr = i;
      }
    }

    if (minCost >= Infinity) {
      console.log('Cannot construct a valid tour');
      return;
    }

    // Get the tour path
    let rtPath: number[] = [];
    while (cr != -1) {
      rtPath.push(cr);
      let prv = cr;
      // console.log(this.dp[mask][cr])
      cr = this.path[mask][cr];
      mask ^= 1 << prv;
    }

    rtPath.reverse();

    console.log('Minimum Cost: ', minCost);
    console.log('Path: ', rtPath);
    // return minCost, rtPath;
    return minCost;
  }
}
