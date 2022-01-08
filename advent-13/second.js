data = require('fs')
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\r\n')
  .filter((ea) => !!ea)

idx = data.findIndex((ea) => ea[0] === 'f')

coords = []
folds = []
for (let i = 0; i < data.length; i++) {
  i < idx ? coords.push(data[i]) : folds.push(data[i])
}

coords = coords.map((ea) => ea.split(',').map(parseFloat))
folds = folds
  .map((ea) => ea.slice(11).split('='))
  .map((ea) => [ea[0], parseFloat(ea[1])])

maxY = folds[1][1] * 2
maxX = folds[0][1] * 2

for (fold of folds) {
  if (fold[0] === 'y') {
    for (let i = 0; i < fold[1]; i++) {
      for (coord of coords) {
        if (coord[1] > fold[1]) {
          coord[1] = 2 * fold[1] - coord[1]
        }
      }
    }
    maxY = Math.ceil(maxY / 2)
  }
  if (fold[0] === 'x') {
    for (let i = 0; i < fold[1]; i++) {
      for (coord of coords) {
        if (coord[0] > fold[1]) {
          coord[0] = 2 * fold[1] - coord[0]
        }
      }
    }
    maxX = Math.ceil(maxX / 2)
  }
}

grid = Array(maxX)
  .fill()
  .map(() => Array(maxY).fill(0))

for (let i = 0; i <= maxX; i++) {
  for (let j = 0; j <= maxY; j++) {
    for (coord of coords) {
      if (i === coord[0] && j === coord[1]) {
        grid[j][i] = 1
      }
    }
  }
}

for (let j = 0; j <= maxY; j++) {
  str = ''
  for (let i = 0; i <= maxX; i++) {
    str += grid[j][i] ? '*' : ' '
  }
  console.log(str)
}
