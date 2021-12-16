const fs = require('fs');

const data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .split('\n\n');

const draws = data[0].trim().replaceAll(',', ' ').split(' ').map(parseFloat);

let grids = [];
for (let i = 1; i < data.length; ++i) {
  grids.push(
    data[i]
      .trim()
      .replaceAll('\n', ' ')
      .replaceAll('  ', ' ')
      .split(' ')
      .map(parseFloat)
  );
}

const printGrid = (grid) => {
  for (let i = 0; i <= 20; i += 5) {
    console.log(grid[i], grid[i + 1], grid[i + 2], grid[i + 3], grid[i + 4]);
  }
  console.log();
};

const checkBingo = (grid) => {
  for (let i = 0; i < 5; i++) {
    if (
      grid[i] === -1 &&
      grid[i + 5] === -1 &&
      grid[i + 10] === -1 &&
      grid[i + 15] === -1 &&
      grid[i + 20] === -1
    ) {
      return 1;
    }
  }
  for (let i = 0; i <= 20; i += 5) {
    if (
      grid[i] === -1 &&
      grid[i + 1] === -1 &&
      grid[i + 2] === -1 &&
      grid[i + 3] === -1 &&
      grid[i + 4] === -1
    ) {
      return 1;
    }
  }
  return 0;
};

const calculateScore = (grid) => {
  let sum = 0;
  grid.forEach((ea) => {
    if (ea !== -1) {
      sum += ea;
    }
  });
  return sum;
};

for (let i = 0; i < draws.length; i++) {
  grids = grids.map((grid) => grid.map((ea) => (ea === draws[i] ? -1 : ea)));

  for (let grid of grids) {
    if (checkBingo(grid)) {
      const score = calculateScore(grid) * draws[i];
      grids.splice(grids.indexOf(grid), 1);

      if (grids.length === 0) {
        console.log(score);
      }
    }
  }
}
