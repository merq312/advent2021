data = require('fs')
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\r\n')
  .map((line) => line.split(' | '))
  .map((line) => line.map((seg) => seg.split(' ')))

key = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
}

count = 0
for (seg of data) {
  for (ea of seg[1]) {
    if (ea.length in key) {
      ++count
    }
  }
}

console.log(count)
