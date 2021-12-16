const fs = require('fs');

let data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .split(',')
  .map(parseFloat);

const max = Math.max.apply(Math, data);

const fuel = new Array(max).fill(0);
for (let i = 0; i < max; i++) {
  for (let ea of data) {
    fuel[i] += Math.abs(ea - i);
  }
}

console.log(Math.min.apply(Math, fuel));
