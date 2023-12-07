const fs = require('fs')
const readline = require('readline')

let sum = 0

const readlineInterface = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
  output: process.stdout,
  terminal: false
})

readlineInterface
  .on('line', decodeLine)
  .on('close', () =>  console.log(`Sum: ${sum}`));
  
function decodeLine(line) {
  const numbers = recursiveStringReplacement(line, 0, 1)
    .split('')
    .filter((char) => Number(char))
    .join('')
  
  sum += Number(numbers.at(0) + numbers.at(-1))
}

const needles = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

function recursiveStringReplacement(searchString, startIndex, endIndex) {
  // Escape when out of string bounds (the search is finished)
  if (endIndex > searchString.length) {
    return searchString;
  }

  const subString = searchString.substring(startIndex, endIndex)

  // Check if the current substring is a needle we are looking for
  const needleIndex = needles.findIndex(needle => needle === subString)

  if (needleIndex > -1) {
    // Track the current index (where the needle was found)
    const indexOfMatch = searchString.indexOf(needles[needleIndex])

    /**
     * Start a new search with a modified search string
     * - Replace the needle with the digit (1, 2, 3, etc...) PLUS the left over substring
     *   Ex. oneight -> consume the "one" (add 1), consume the "i", the "g", the "h" and the "t"
     * 
     * - Start searching starting at the index of the last found needle
     *   Ex. teseightwothree becomes tes8wothree
     *     We start searching with 'w'
     */
    return recursiveStringReplacement(
      searchString.replace(needles[needleIndex], (needleIndex + 1).toString() + subString.substring(1, subString.length)),
      indexOfMatch,
      indexOfMatch + 1
    )
  }
  
  /**
   * When a partial needle is matched we need another iteration
   * with the next character in the search string.
   * 
   * Ex. teseightwothree
   * 't' partially matches 'two', so next iteration check 'te'
   * 
   * Note: We use needle.substring() to check from left to right of a partial match
   */
  if (needles.some(needle => needle.substring(0, subString.length) === subString)) {
    return recursiveStringReplacement(searchString, startIndex, endIndex + 1)
  }

  /**
   * Neither an exact, or partial needle match was found.  
   * We need to back up to the start of the current substring.
   * 
   * Ex. threfour
   * 'thref' does not match a needle, so we back up and start over with 'h', 'hr', etc
   */
  return recursiveStringReplacement(searchString, startIndex + 1, startIndex + 2)
}


