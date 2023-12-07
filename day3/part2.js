const fs = require("fs");
const path = require("node:path");

/**
 * Whole file in memory is cheating imo... but hey ¯\_(ツ)_/¯
 */
fs.readFile(path.resolve("./input.txt"), "utf-8", (err, data) => {
  
  /**
   * We need a "frequency map" to track the locations of
   * special characters, and all the numbers they are adjacent too.
   * 
   * Ex:
   * {
   *   '1': { '3': [ '467', '35' ] },
   *   '3': { '6': [ '633' ] },
   *   '4': { '3': [ '617' ] },
   *   '5': { '5': [ '592' ] },
   *   '8': { '3': [ '664' ], '5': [ '755', '598' ] }
   * }
   * 
   * The first level is the line index
   * The second level is the character index
   * The third level is an array of all numbers adjacent to that special character
   */
  const map = {};

  function addToFrequencyMap(lineIndex, charIndex, number) {
    if (!map[lineIndex]) map[lineIndex] = {};
    if (!map[lineIndex][charIndex]) map[lineIndex][charIndex] = [];
    map[lineIndex][charIndex].push(number);
  }

  const lines = data.split("\n");

  // Step over each line
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    let line = lines[lineIndex];

    // Step over each character
    for (let i = 0; i < line.length; i++) {
      // Ignore all non-numbers
      if (!isNaN(line[i])) {
        let numberSubString = "";
        let j = i;

        /**
         * A single line could look like:
         * "467..114.."
         *  ^
         * When we run into this '4', we need to build the complete number '467'.
         *
         * Lets step forward until we no longer hit a number. Each step we add that
         * value into numberSubString
         */
        for (; j < line.length; j++) {
          if (!isNaN(line[j])) numberSubString += line[j];
          else break;
        }

        /**
         * Now that we have extracted '467' from "467..114.."
         * we need to check the indexices from the previous and next lines
         *
         * Ex:
         *  467..114..
         *  ...*......
         *
         * We check indexices 0, 1, 2, 3, 4 on the next line to rule out all
         * adjacent special characters
         */
        for (let k = i; k < j; k++) {
          /**
           * When we incounter a symbol, we will add the number
           * adjacent into our frequency map
           */
          if (isSymbol(line[k - 1])) {
            addToFrequencyMap(lineIndex, k - 1, numberSubString);
            break;
          } else if (isSymbol(line[k + 1])) {
            addToFrequencyMap(lineIndex, k + 1, numberSubString);
            break;
          } else if (
            lines[lineIndex - 1] &&
            isSymbol(lines[lineIndex - 1][k - 1])
          ) {
            addToFrequencyMap(lineIndex - 1, k - 1, numberSubString);
            break;
          } else if (
            lines[lineIndex - 1] &&
            isSymbol(lines[lineIndex - 1][k])
          ) {
            addToFrequencyMap(lineIndex - 1, k, numberSubString);
            break;
          } else if (
            lines[lineIndex - 1] &&
            isSymbol(lines[lineIndex - 1][k + 1])
          ) {
            addToFrequencyMap(lineIndex - 1, k + 1, numberSubString);
            break;
          } else if (
            lines[lineIndex + 1] &&
            isSymbol(lines[lineIndex + 1][k - 1])
          ) {
            addToFrequencyMap(lineIndex + 1, k - 1, numberSubString);
            break;
          } else if (
            lines[lineIndex + 1] &&
            isSymbol(lines[lineIndex + 1][k])
          ) {
            addToFrequencyMap(lineIndex + 1, k, numberSubString);
            break;
          } else if (
            lines[lineIndex + 1] &&
            isSymbol(lines[lineIndex + 1][k + 1])
          ) {
            addToFrequencyMap(lineIndex + 1, k + 1, numberSubString);
            break;
          }
        }

        /**
         * Lastly we move the index forward.
         *
         * "467..114.."
         *  ^  ^
         *  --->
         *
         * We started at 0, but found the number 467. We need to set the index to 4
         */
        i = j;
      }
    }
  }

  let sum = 0;

  Object.keys(map).forEach((lineKey) => {
    Object.keys(map[lineKey]).forEach((charKey) => {
      const parts = map[lineKey][charKey];

      // Only count 'gears', parts with two adjacent symbols
      if (parts.length !== 2) {
        return;
      }

      sum += parts[0] * parts[1];
    });
  });

  console.log(`Sum: ${sum}`);
});

function isSymbol(char) {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(char);
}
