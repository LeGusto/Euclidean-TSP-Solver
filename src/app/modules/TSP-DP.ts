export class TSPSolverModule {
  totalCost(
    mask: number,
    curr: number,
    n: number,
    cost: number[][],
    memo: number[][],
    adjList: number[][] = []
  ): number {
    if (mask === (1 << n) - 1) {
      return 0; // All cities visited, don't need to return to start
    }

    if (memo[curr][mask] !== -1) {
      return memo[curr][mask];
    }

    let ans: number = Number.MAX_VALUE;

    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) === 0 && adjList[curr].includes(i)) {
        const newMask: number = mask | (1 << i);
        const newCost: number =
          cost[curr][i] + this.totalCost(newMask, i, n, cost, memo);
        ans = Math.min(ans, newCost);
      }
    }

    memo[curr][mask] = ans;
    return ans;
  }

  tsp(cost: number[][], adjList: number[][]): number {
    const n: number = cost.length;
    const memo: number[][] = Array.from({ length: n }, () =>
      Array(1 << n).fill(-1)
    );
    return this.totalCost(1, 0, n, cost, memo, adjList);
  }
}
