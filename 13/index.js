'use strict'
const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
var arr = input.split('\n').map(x => {
    let parse = x.match(/[0-9]+/g);
    return {'id': parseInt(parse[0]), 'height': parseInt(parse[1])};
});

function check (delay) {
  return arr.reduce((severity, current) => {
        if (((current.id + delay) % (current.height + current.height - 2)) == 0) {
            severity += current.id * current.height + 1;
        }
        return severity;
    }, 0)  
}



var delay = 0;
var severity = 1;
do {
    delay++;
    severity = check(delay);

} while (severity > 0);

console.log(delay);