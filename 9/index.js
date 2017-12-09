'use strict'
const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
const arr = input.split(',\n');

function count(line) {
    let i = 0;
    let level = 0;
    let garbage = false;
    let score = 0;
    let removed = 0;
    while (i < line.length) {
        if (line.charAt(i) == '!') {
            i += 2;
            continue;
        }

        switch(line.charAt(i)) {
            case '{':
                if(!garbage) {
                    level++;
                } else {
                    removed++;
                }
                i++;
                break;
            case '}':
                if(!garbage) {
                    score += level;
                    level--;
                } else {
                    removed++;
                }
                i++;
                break;
            case '<':
                if (garbage) {
                    removed++;
                }
                garbage = true;
                i++;
                break;
            case '>':
                garbage = false;
                i++;
                break;
            default:
                if (garbage) {
                    removed++;
                }
                i++;
                break;
        }
    }
    console.log(removed)
    return {'score': score, 'removed': removed};
}

const result = arr.reduce((current, line) => {
    let result = count(line);
    result.score += current.score; 
    result.removed += current.removed;
    return result}, {'score': 0, 'removed': 0})

console.log(result);
