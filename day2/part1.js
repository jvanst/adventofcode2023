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

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const MAX_REDS = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

function handleLine(line) {
  // Parse out sets. Ex: "5 red, 2 blue, 7 green; 1 red, 8 green; 6 green, 4 red"
  const sets = line.split(":")[1].split(";");

  for (let i = 0; i < sets.length; i++) {
    // Parse out blocks. Ex: "5 red, 2 blue, 7 green"
    const blocks = sets[i].split(",");

    for (let j = 0; j < blocks.length; j++) {
      // Parse out number and color. Ex: "5 red"
      const [number, color] = blocks[j].trim().split(" ");

      // If any number of blocks is over the maximum return early (This game won't be counted)
      if (
        (color === "red" && Number(number) > MAX_REDS) ||
        (color === "green" && Number(number) > MAX_GREEN) ||
        (color === "blue" && Number(number) > MAX_BLUE)
      ) {
        return;
      }
    }
  }

  // Valid game, add game number to total
  sum += Number(line.split(":")[0].split(" ")[1]);
}
