const fs = require('fs');

let data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .split(',')
  .map(parseFloat);

const fish = new Array(9).fill(0)
for (let ea of data) {
  fish[ea]++
}

console.log(fish)
for (let i = 0; i < 256; i++) {
  const oldFish = fish.shift()
  fish[6] += oldFish
  fish[8] = oldFish
  console.log(fish)
}

console.log(fish.reduce((previousValue, currentValue) => previousValue+currentValue))
