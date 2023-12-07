const fs = require("fs");
const readline = require("readline");
const path = require("node:path");

let sum = 0;

const readlineInterface = readline.createInterface({
  input: fs.createReadStream(path.resolve("./input.txt")),
  output: process.stdout,
  terminal: false,
});

readlineInterface
  .on("line", handleLine)
  .on("close", () => console.log(`Sum: ${sum}`));

function handleLine(line) {
  let totalWinningNumbers = 0;
  let [winningNumbers, givenNumbers] = line.split(":")[1].split("|");

  winningNumbers = winningNumbers.trim().split(" ");
  givenNumbers = givenNumbers.trim().split(" ");

  givenNumbers.forEach((givenNumber) => {
    if (winningNumbers.find(winningNumber => givenNumber === winningNumber)) {
      totalWinningNumbers += 1;
    }
  });

  if (totalWinningNumbers) sum += Math.pow(2, totalWinningNumbers - 1);
}
