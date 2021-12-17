const fs = require('fs');

let data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\n')
  .map((ea) => ea.split('').map(parseFloat));

const lowPoints = [];
const width = data.length;
const height = data[0].length;

for (let col = 0; col < width; ++col) {
  for (let row = 0; row < height; ++row) {
    let isLowPoint = true;
    for (let delta_col of [col - 1, col, col + 1]) {
      for (let delta_row of [row - 1, row, row + 1]) {
        if (delta_row === row && delta_col === col) {
          continue;
        }
        if (delta_col === -1 || delta_row === -1) {
          continue;
        }
        if (delta_col === width || delta_row === height) {
          continue;
        }
        if (data[col][row] >= data[delta_col][delta_row]) {
          isLowPoint = false;
          break;
        }
      }
      if (!isLowPoint) break;
    }
    if (isLowPoint) {
      lowPoints.push(data[col][row]);
    }
  }
}

console.log(lowPoints.map((ea) => ea + 1).reduce((prev, curr) => prev + curr));
