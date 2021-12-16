const fs = require('fs');

const data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\n')
  .map(parseFloat);

let prev = data[0];
let inc = 0;
for (let ea of data) {
  if (ea > prev) {
    inc++;
  }
  prev = ea;
}

console.log(inc);
