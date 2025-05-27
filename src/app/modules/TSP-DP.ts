type Edge = { to: number; cost: number };
type AdjacencyList = Edge[][];
type MemoKey = `${number},${number}`; // Bitmask, CurrentCity

class TSPSolver {
  private adj: AdjacencyList;
  private n: number;
  private memo: Map<MemoKey, { cost: number; prevCity?: number }>;
  private fullMask: number;

  constructor(adjacencyList: AdjacencyList) {
    this.adj = adjacencyList;
    this.n = adjacencyList.length;
    this.memo = new Map();
    this.fullMask = (1 << this.n) - 1;
  }

  public solve(): { path: number[]; cost: number } {
    if (this.n === 0) return { path: [], cost: 0 };

    // Initialize DP for single-city subsets
    for (let i = 0; i < this.n; i++) {
      const key: MemoKey = `${1 << i},${i}`;
      this.memo.set(key, { cost: 0 });
    }

    // Solve for all subset sizes from 2 to n
    for (let subsetSize = 2; subsetSize <= this.n; subsetSize++) {
      const subsets = this.generateSubsets(subsetSize);

      for (const mask of subsets) {
        for (let currentCity = 0; currentCity < this.n; currentCity++) {
          if (!(mask & (1 << currentCity))) continue;

          const prevMask = mask ^ (1 << currentCity);
          let minCost = Infinity;
          let bestPrevCity = -1;

          // Check all possible previous cities
          for (let prevCity = 0; prevCity < this.n; prevCity++) {
            if (!(prevMask & (1 << prevCity))) continue;

            // Find edge from prevCity to currentCity
            const edge = this.adj[prevCity].find((e) => e.to === currentCity);
            if (!edge) continue;

            const prevKey: MemoKey = `${prevMask},${prevCity}`;
            const prevData = this.memo.get(prevKey);
            if (!prevData) continue;

            const totalCost = prevData.cost + edge.cost;
            if (totalCost < minCost) {
              minCost = totalCost;
              bestPrevCity = prevCity;
            }
          }

          if (minCost !== Infinity) {
            const key: MemoKey = `${mask},${currentCity}`;
            this.memo.set(key, { cost: minCost, prevCity: bestPrevCity });
          }
        }
      }
    }

    // Find the minimum cost in full subset
    let minCost = Infinity;
    let lastCity = -1;

    for (let city = 0; city < this.n; city++) {
      const key: MemoKey = `${this.fullMask},${city}`;
      const data = this.memo.get(key);
      if (data && data.cost < minCost) {
        minCost = data.cost;
        lastCity = city;
      }
    }

    if (minCost === Infinity) {
      throw new Error('No valid path visiting all cities');
    }

    // Reconstruct the path
    const path = this.reconstructPath(this.fullMask, lastCity);
    return { path, cost: minCost };
  }

  private generateSubsets(size: number): number[] {
    const subsets: number[] = [];
    this.backtrackSubsets(0, 0, 0, size, subsets);
    return subsets;
  }

  private backtrackSubsets(
    start: number,
    currentMask: number,
    currentSize: number,
    targetSize: number,
    subsets: number[]
  ): void {
    if (currentSize === targetSize) {
      subsets.push(currentMask);
      return;
    }

    for (let city = start; city < this.n; city++) {
      this.backtrackSubsets(
        city + 1,
        currentMask | (1 << city),
        currentSize + 1,
        targetSize,
        subsets
      );
    }
  }

  private reconstructPath(mask: number, lastCity: number): number[] {
    const path: number[] = [];
    let currentMask = mask;
    let currentCity = lastCity;

    // Todo: rework basically everything
    while (currentMask !== 0) {
      path.unshift(currentCity);
      const key: MemoKey = `${currentMask},${currentCity}`;
      const data = this.memo.get(key);

      if (!data?.prevCity !== undefined) break;

      currentMask ^= 1 << currentCity;
      currentCity = data.prevCity;
    }

    return path;
  }
}

// Example usage:
const adjacencyList: AdjacencyList = [
  [
    { to: 1, cost: 10 },
    { to: 2, cost: 15 },
  ], // City 0
  [
    { to: 0, cost: 10 },
    { to: 2, cost: 35 },
    { to: 3, cost: 25 },
  ], // City 1
  [
    { to: 0, cost: 15 },
    { to: 1, cost: 35 },
    { to: 3, cost: 30 },
  ], // City 2
  [
    { to: 0, cost: 20 },
    { to: 1, cost: 25 },
    { to: 2, cost: 30 },
  ], // City 3
];

const solver = new TSPSolver(adjacencyList);
const result = solver.solve();

console.log('Optimal Path:', result.path);
console.log('Total Cost:', result.cost);
