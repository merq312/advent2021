const fs = require("fs");

const data = fs
  .readFileSync("data", { encoding: "utf-8", flag: "r" })
  .trim()
  .split("\n");

let horz = 0;
let depth = 0;

for (let ea of data) {
  const cmd = ea.split(" ");
  cmd[1] = parseFloat(cmd[1]);
  switch (cmd[0]) {
    case "forward":
      horz += cmd[1];
      break;
    case "up":
      depth -= cmd[1];
      break;
    case "down":
      depth += cmd[1];
      break;
  }
}

console.log(horz, depth);
console.log(horz * depth);
