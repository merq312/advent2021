data = require('fs')
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\r\n')
  .map((line) => line.split('').map(parseFloat))

height = data.length
width = data[0].length

flashes = 0
for (i = 0; i < 100; i++) {
  data = data.map((line) => line.map((ea) => ++ea))

  flash = true
  while (flash) {
    flash = false
    for (col = 0; col < width; col++) {
      for (row = 0; row < height; row++) {
        if (data[col][row] > 9) {
          flash = true
          flashes++
          data[col][row] = 0

          for (delta_col of [col - 1, col, col + 1]) {
            for (delta_row of [row - 1, row, row + 1]) {
              if (
                delta_col === -1 ||
                delta_row === -1 ||
                delta_col === width ||
                delta_row === height
              ) {
                continue
              }
              if (data[delta_col][delta_row] === 0) {
                continue
              }
              if (delta_col === col && delta_row === row) {
                continue
              }
              data[delta_col][delta_row]++
            }
          }
        }
      }
    }
  }
}

console.log(flashes)
