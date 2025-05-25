type DistanceMatrix = number[][];
type MemoizationTable = { [key: string]: number };

class TSPSolver {
  private distanceMatrix: DistanceMatrix;
  private numCities: number;
  private memo: MemoizationTable;
  private parent: { [key: string]: number };

  constructor(distanceMatrix: DistanceMatrix) {
    this.distanceMatrix = distanceMatrix;
    this.numCities = distanceMatrix.length;
    this.memo = {};
    this.parent = {};
  }

  public solve(): { path: number[]; cost: number } {
    if (this.numCities === 0) {
      return { path: [], cost: 0 };
    }

    // Initialize memoization for subsets with just the starting city (0)
    for (let k = 1; k < this.numCities; k++) {
      const key = this.createKey(1 << k, k);
      this.memo[key] = this.distanceMatrix[0][k];
    }

    // Solve for all subsets
    for (let subsetSize = 2; subsetSize < this.numCities; subsetSize++) {
      const subsets = this.generateSubsets(subsetSize);
      for (const subset of subsets) {
        for (let k = 1; k < this.numCities; k++) {
          if (!this.isInSubset(k, subset)) continue;

          const prevSubset = subset ^ (1 << k);
          let minDist = Infinity;
          let bestPrevCity = -1;

          for (let m = 1; m < this.numCities; m++) {
            if (m === k || !this.isInSubset(m, prevSubset)) continue;

            const key = this.createKey(prevSubset, m);
            const newDist = this.memo[key] + this.distanceMatrix[m][k];

            if (newDist < minDist) {
              minDist = newDist;
              bestPrevCity = m;
            }
          }

          const key = this.createKey(subset, k);
          this.memo[key] = minDist;
          this.parent[key] = bestPrevCity;
        }
      }
    }

    // Find the minimum cost to return to the starting city (0)
    const fullSubset = (1 << this.numCities) - 2; // All cities except 0
    let minCost = Infinity;
    let lastCity = -1;

    for (let k = 1; k < this.numCities; k++) {
      const key = this.createKey(fullSubset, k);
      const totalCost = this.memo[key] + this.distanceMatrix[k][0];

      if (totalCost < minCost) {
        minCost = totalCost;
        lastCity = k;
      }
    }

    // Reconstruct the path
    const path = this.reconstructPath(fullSubset, lastCity);
    path.unshift(0); // Add starting city
    path.push(0); // Return to starting city

    return { path, cost: minCost };
  }

  private createKey(subset: number, city: number): string {
    return `${subset},${city}`;
  }

  private isInSubset(city: number, subset: number): boolean {
    return (subset & (1 << city)) !== 0;
  }

  private generateSubsets(size: number): number[] {
    const subsets: number[] = [];
    this.generateSubsetsHelper(1, 0, size, subsets);
    return subsets;
  }

  private generateSubsetsHelper(
    currentCity: number,
    currentSubset: number,
    remaining: number,
    subsets: number[]
  ): void {
    if (remaining === 0) {
      subsets.push(currentSubset);
      return;
    }

    if (currentCity >= this.numCities) {
      return;
    }

    // Include current city
    this.generateSubsetsHelper(
      currentCity + 1,
      currentSubset | (1 << currentCity),
      remaining - 1,
      subsets
    );

    // Exclude current city
    this.generateSubsetsHelper(
      currentCity + 1,
      currentSubset,
      remaining,
      subsets
    );
  }

  private reconstructPath(subset: number, lastCity: number): number[] {
    const path: number[] = [];
    let currentSubset = subset;
    let currentCity = lastCity;

    while (currentSubset !== 0) {
      path.unshift(currentCity);
      const key = this.createKey(currentSubset, currentCity);
      const prevCity = this.parent[key];
      currentSubset = currentSubset ^ (1 << currentCity);
      currentCity = prevCity;
    }

    return path;
  }
}

// Example usage:
const distanceMatrix: number[][] = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0],
];

const solver = new TSPSolver(distanceMatrix);
const result = solver.solve();

console.log('Optimal Path:', result.path);
console.log('Total Cost:', result.cost);
