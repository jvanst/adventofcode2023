const fs = require('fs')
const readline = require('readline')

let sum = 0

const readlineInterface = readline.createInterface({
  input: fs.createReadStream('../input.txt'),
  output: process.stdout,
  terminal: false
})

readlineInterface
  .on('line', decodeLine)
  .on('close', () =>  console.log(`Sum: ${sum}`));
   
function decodeLine(line) {
  const numbers = line
    .split('')
    .filter((char) => Number(char))
    .join('')

  sum += Number(numbers.at(0) + numbers.at(-1))
}