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

const corruptedLines = [];
for (let [idx, line] of data.entries()) {
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
  if (corruptedChar) corruptedLines.push(idx);
}

for (let idx of corruptedLines.sort((a, b) => b - a)) {
  data.splice(idx, 1);
}

const popChar = (charToRemove, charArr) => {
  for (let [idx, char] of charArr.reverse().entries()) {
    if (char === charToRemove) {
      charArr.splice(idx, 1);
      break;
    }
  }
  charArr.reverse();
};

const charPairsRev = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const completionString = [];
for (let line of data) {
  const openChars = [];

  for (let char of line) {
    if (char in charPairs) {
      popChar(char, openChars);
    } else {
      openChars.push(charPairsRev[char]);
    }
  }

  completionString.push(openChars.reverse());
}

const scoreTable = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const scores = [];
for (const line of completionString) {
  scores.push(line.reduce((prev, curr) => prev * 5 + scoreTable[curr], 0));
}

scores.sort((a, b) => a - b);
console.log(scores[Math.floor(scores.length / 2)]);
