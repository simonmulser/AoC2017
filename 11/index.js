'use strict'
const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
const arr = input.split(',');

function dist(position){
    return (Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.z))/2
}

const position = arr.reduce((position, step) => {
    switch(step){
        case 'n':
            position.y++;
            position.x--;
            break;
        case 's':
            position.y--;
            position.x++;
            break;

        case 'nw':
            position.y++;
            position.z--;
            break;
        case 'se':
            position.y--;
            position.z++;
            break;

        case 'ne':
            position.z++;
            position.x--;
            break;
        case 'sw':
            position.z--;
            position.x++;
            break;
    }
    if (dist(position) > position.max) {
        position.max = dist(position);
    }

    return position;
}, {x: 0, y: 0, z:0, max: 0})

console.log(position);
console.log(dist(position))
console.log(position.max);
