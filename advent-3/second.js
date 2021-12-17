const fs = require('fs');

const data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\n')
  .map((ea) => ea.split('').map(parseFloat));

let oxygen = JSON.parse(JSON.stringify(data));
let c02 = JSON.parse(JSON.stringify(data));

for (let i = 0; i < oxygen[0].length; i++) {
  let ones = 0;
  let zeros = 0;
  let which = 0;

  for (let j = 0; j < oxygen.length; j++) {
    oxygen[j][i] ? ones++ : zeros++;
  }

  if (zeros > ones) {
    which = 0;
  } else {
    which = 1;
  }

  oxygen = oxygen.filter((ea) => ea[i] === which);

  if (oxygen.length === 1) {
    break;
  }
}

for (let i = 0; i < c02[0].length; i++) {
  let ones = 0;
  let zeros = 0;
  let which = 0;

  for (let j = 0; j < c02.length; j++) {
    c02[j][i] ? ones++ : zeros++;
  }

  if (zeros > ones) {
    which = 1;
  } else {
    which = 0;
  }

  c02 = c02.filter((ea) => ea[i] === which);

  if (c02.length === 1) {
    break;
  }
}

console.log(parseInt(oxygen[0].join(''), 2) * parseInt(c02[0].join(''), 2));
