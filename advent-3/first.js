const fs = require("fs");

const data = fs
  .readFileSync("data", { encoding: "utf-8", flag: "r" })
  .trim()
  .split("\n")
  .map((ea) => ea.split("").map(parseFloat));

const ones = new Array(data[0].length).fill(0);
const zeros = new Array(data[0].length).fill(0);

for (let i = 0; i < data[0].length; i++) {
  for (let j = 0; j < data.length; j++) {
    data[j][i] ? ones[i]++ : zeros[i]++;
  }
}

const gamma = [];
const epsilon = [];
for (let i = 0; i < zeros.length; i++) {
  if (zeros[i] > ones[i]) {
    gamma.push(0);
    epsilon.push(1);
  } else {
    gamma.push(1);
    epsilon.push(0);
  }
}

console.log(parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2));
