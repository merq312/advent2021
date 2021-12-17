const fs = require('fs');

const data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\n')
  .map((ea) => ea.replace(' -> ', ',').split(','))
  .map((ea) => {
    return {
      p1: { x: parseFloat(ea[0]), y: parseFloat(ea[1]) },
      p2: { x: parseFloat(ea[2]), y: parseFloat(ea[3]) },
    };
  })
  .filter((ea) => ea.p1.x === ea.p2.x || ea.p1.y === ea.p2.y);

const gridSize = 1000;
const grid = Array(gridSize)
  .fill(0)
  .map((x) => Array(gridSize).fill(0));

const drawLine = (p1, p2) => {
  const [xStart, xEnd] = p1.x > p2.x ? [p2.x, p1.x] : [p1.x, p2.x];
  const [yStart, yEnd] = p1.y > p2.y ? [p2.y, p1.y] : [p1.y, p2.y];

  for (let i = yStart; i <= yEnd; i++) {
    for (let j = xStart; j <= xEnd; j++) {
      grid[i][j]++;
    }
  }
};

for (let line of data) {
  drawLine(line.p1, line.p2);
}

let count = '';
for (const line of grid) {
  for (const ea of line) {
    if (ea > 1) {
      count++;
    }
  }
}
console.log(count);
