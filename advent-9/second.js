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
      lowPoints.push([col, row]);
    }
  }
}

const isValid = (point) =>
  point[0] > -1 && point[0] < width && point[1] > -1 && point[1] < height;

const notInBasin = (point, basin) =>
  !basin.find((ea) => ea[0] === point[0] && ea[1] === point[1]);

const notNine = (point) => data[point[0]][point[1]] !== 9;

const isGreater = (point, dirPoint) =>
  data[dirPoint[0]][dirPoint[1]] > data[point[0]][point[1]];

const checkDir = (point, dirPoint, basin) =>
  isValid(dirPoint) &&
  notInBasin(dirPoint, basin) &&
  notNine(dirPoint) &&
  isGreater(point, dirPoint);

const basins = [];
for (let lowPoint of lowPoints) {
  const basin = [lowPoint];

  for (let point of basin) {
    const up = [point[0] - 1, point[1]];
    const down = [point[0] + 1, point[1]];
    const left = [point[0], point[1] - 1];
    const right = [point[0], point[1] + 1];

    for (const ea of [up, down, left, right]) {
      if (checkDir(point, ea, basin)) {
        basin.push(ea);
      }
    }
  }

  basins.push(basin.length);
}

basins.sort((a, b) => b - a);
console.log(basins[0] * basins[1] * basins[2]);
