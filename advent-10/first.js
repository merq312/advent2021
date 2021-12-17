const fs = require('fs');

let data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\n')
  .map((ea) => ea.split(''));

charPairs = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const checkOpenChars = (openChars, char) => {
  if (openChars.at(-1) !== charPairs[char]) {
    return char;
  } else {
    openChars.pop();
    return '';
  }
};

let corruptedChars = [];
for (let line of data) {
  let corruptedChar = '';
  let openChars = [];

  for (let char of line) {
    if (char in charPairs) {
      corruptedChar = checkOpenChars(openChars, char);
    } else {
      openChars.push(char);
    }
    if (corruptedChar) break;
  }
  corruptedChars.push(corruptedChar);
}

const sym = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
  '': 0,
};

console.log(corruptedChars.reduce((prev, curr) => prev + sym[curr], 0));
