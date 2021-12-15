const fs = require("fs");

const data = fs
  .readFileSync("data", { encoding: "utf-8", flag: "r" })
  .trim()
  .split("\n")
  .map(parseFloat)
  .map((ea, idx, arr) => {
    if (arr[idx + 2]) {
      return ea + arr[idx + 1] + arr[idx + 2];
    } else if (arr[idx + 1]) {
      return ea + arr[idx + 1];
    } else {
      return ea;
    }
  });

let prev = data[0];
let inc = 0;
for (let ea of data) {
  if (ea > prev) {
    inc++;
  }
  prev = ea;
}

console.log(inc);
