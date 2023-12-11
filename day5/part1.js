const fs = require("fs");
const path = require("node:path");
const lines = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .split("\n");

let seeds = lines
  .shift()
  .split(": ")[1]
  .split(" ")
  .map((e) => parseInt(e));

let tempSeeds = []

for (let i = 1; i < lines.length; i++) {
  if (lines[i].includes(":")) continue;
  if (!lines[i].length) {
    seeds = seeds.concat(tempSeeds);
    tempSeeds = []
    continue;
  }

  const [destinationStart, sourceStart, range] = lines[i]
    .split(" ")
    .map((e) => parseInt(e));

  seeds = seeds.filter(seed => {
    if (inRange(seed, sourceStart, sourceStart + range)) {
      tempSeeds.push(destinationStart - sourceStart + seed)
      return false;
    }
    return true;
  })
}

function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}

console.log('\nFinal: ', seeds.concat(tempSeeds).sort((a, b) => a - b)[0])

