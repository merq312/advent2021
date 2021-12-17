const fs = require('fs');

let data = fs
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\n')
  .map((ea) => ea.split(''));

const checkOpenChars = (openChars, char, charPair) => {
  if (openChars.at(-1) !== charPair) {
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
  corruptedChars.push(corruptedChar);
}

console.log(
  corruptedChars.reduce((prev, curr) => {
    switch (curr) {
      case ')':
        return prev + 3;
      case ']':
        return prev + 57;
      case '}':
        return prev + 1197;
      case '>':
        return prev + 25137;
      default:
        return prev;
    }
  }, 0)
);
