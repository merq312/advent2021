const fs = require('fs');

let data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\n')
  .map((ea) => ea.split(''));

const checkOpenChars = (openChars, char, charOpen) => {
  if (openChars.at(-1) !== charOpen) {
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
    switch (char) {
      case '(':
      case '[':
      case '<':
      case '{':
        openChars.push(char);
        break;
      case ')':
        corruptedChar = checkOpenChars(openChars, char, '(');
        break;
      case ']':
        corruptedChar = checkOpenChars(openChars, char, '[');
        break;
      case '>':
        corruptedChar = checkOpenChars(openChars, char, '<');
        break;
      case '}':
        corruptedChar = checkOpenChars(openChars, char, '{');
        break;
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

const completionString = [];
for (let line of data) {
  const openChars = [];

  for (let char of line) {
    switch (char) {
      case '(':
        openChars.push(')');
        break;
      case '[':
        openChars.push(']');
        break;
      case '<':
        openChars.push('>');
        break;
      case '{':
        openChars.push('}');
        break;
      case ')':
      case ']':
      case '>':
      case '}':
        popChar(char, openChars);
        break;
    }
  }

  completionString.push(openChars.reverse());
}

const scores = [];
for (const line of completionString) {
  scores.push(
    line.reduce((prev, curr) => {
      prev = prev * 5;
      switch (curr) {
        case ')':
          return prev + 1;
        case ']':
          return prev + 2;
        case '}':
          return prev + 3;
        case '>':
          return prev + 4;
      }
    }, 0)
  );
}

scores.sort((a, b) => a - b);
console.log(scores[Math.floor(scores.length / 2)]);
