const fs = require("fs");
const readline = require("readline");
const path = require("node:path");

let sum = 0;

const readlineInterface = readline.createInterface({
  input: fs.createReadStream(path.resolve("../input.txt")),
  output: process.stdout,
  terminal: false,
});

readlineInterface
  .on("line", handleLine)
  .on("close", () => console.log(`Sum: ${sum}`));

  function handleLine(line) {
    let maximumRedRequired = 0;
    let maximumGreenRequired = 0;
    let maximumBlueRequired = 0;

    // Parse out sets. Ex: "5 red, 2 blue, 7 green; 1 red, 8 green; 6 green, 4 red"
    const sets = line.split(":")[1].split(";");
  
    for (let i = 0; i < sets.length; i++) {
      // Parse out blocks. Ex: "5 red, 2 blue, 7 green"
      const blocks = sets[i].split(",");
  
      for (let j = 0; j < blocks.length; j++) {
        // Parse out number and color. Ex: "5 red"
        const [number, color] = blocks[j].trim().split(" ");
  
        if (color === 'red' && Number(number) > maximumRedRequired)
          maximumRedRequired = Number(number)
        else if (color === 'green' && Number(number) > maximumGreenRequired)
          maximumGreenRequired = Number(number)
        else if (color === 'blue' && Number(number) > maximumBlueRequired)
          maximumBlueRequired = Number(number)
      }
    }
    
    // Add power of required blocks to sum
    sum += (maximumRedRequired * maximumGreenRequired * maximumBlueRequired)
  }