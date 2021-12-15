const fs = require("fs");

const data = fs
  .readFileSync("data", { encoding: "utf-8", flag: "r" })
  .trim()
  .split("\n")
  .map((ea) => ea.split("").map(parseFloat));

let oxygen = JSON.parse(JSON.stringify(data));
let carbondioxide = JSON.parse(JSON.stringify(data));

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
for (let i = 0; i < carbondioxide[0].length; i++) {
  let ones = 0;
  let zeros = 0;
  let which = 0;

  for (let j = 0; j < carbondioxide.length; j++) {
    carbondioxide[j][i] ? ones++ : zeros++;
  }

  if (zeros > ones) {
    which = 1;
  } else {
    which = 0;
  }

  carbondioxide = carbondioxide.filter((ea) => ea[i] === which);

  if (carbondioxide.length === 1) {
    break;
  }
}

console.log(oxygen);
console.log(carbondioxide);

console.log(
  parseInt(oxygen[0].join(""), 2) * parseInt(carbondioxide[0].join(""), 2)
);
