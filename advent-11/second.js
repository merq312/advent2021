data = require('fs')
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\r\n')
  .map((line) => line.split('').map(parseFloat))

height = data.length
width = data[0].length

for (i = 1; ; i++) {
  data = data.map((line) => line.map((ea) => ++ea))

  zero = false
  flash = true
  while (flash && !zero) {
    zero = true
    flash = false
    for (col = 0; col < width; col++) {
      for (row = 0; row < height; row++) {
        if (data[col][row] !== 0) {
          zero = false
        }

        if (data[col][row] > 9) {
          flash = true
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
  if (zero) {
    console.log(i)
    break
  }
}
