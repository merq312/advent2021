const fs = require('fs');

let data = fs
  .readFileSync('test-data', { encoding: 'utf-8', flag: 'r' })
  .split(',')
  .map(parseFloat);

for (let i = 0; i < 256; i++) {
  let count = 0;
  console.log(i);
  data = data.map((ea) => {
    if (ea === 0) {
      ++count;
      return 6;
    } else {
      return ea - 1;
    }
  });
  data.push(...new Array(count).fill(8));
}
console.log(data.length);
