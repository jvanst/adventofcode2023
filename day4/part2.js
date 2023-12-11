const fs = require("fs");
const path = require("node:path");
const data = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .split("\n");

const instances = Array(data.length).fill(1);

for (let i = 0; i < data.length; i++) {
  let [winningNumbers, givenNumbers] = data[i].split(": ")[1].split(" | ");

  winningNumbers = winningNumbers
    .trim()
    .split(" ")
    .filter((x) => x != "")
    .map((y) => parseInt(y));
  givenNumbers = givenNumbers
    .trim()
    .split(" ")
    .filter((x) => x != "")
    .map((y) => parseInt(y));

  let winningAmount = 0;

  for (const winningNumber of winningNumbers) {
    if (givenNumbers.includes(winningNumber)) winningAmount++;
  }

  for (let j = i + 1; j <= i + winningAmount; j++) {
    instances[j] += instances[i];
  }
}

let total = 0;

instances.every((instance) => (total += instance));

console.log(total);
