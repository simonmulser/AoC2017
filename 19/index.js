'use strict'
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8');

const map = input.split('\n').map(elem => elem.split(''));
const y_length = map.length;
const x_length = map[0].length;

const possible_directions = ['d', 'u', 'r', 'l'];
const opposite = {
    'd': 'u', 'u': 'd', 'r': 'l', 'l': 'r'
}
const way = ['-', '|', '+'];

function go(direction, pos) {
    let new_pos = Object.assign({}, pos); 
    switch(direction){
        case 'd': 
            new_pos.y++;
            break;
        case 'u': 
            new_pos.y--;
            break;
        case 'r': 
            new_pos.x++;
            break;
        case 'l': 
            new_pos.x--;
            break;
        default:
            console.log('should not happen!');
    }

    return new_pos;
}

function search(direction, pos) {
    for(let i = 0; i < possible_directions.length; i++){
        let possible_direction = possible_directions[i];

        if (direction != possible_direction && opposite[direction] != possible_direction) {
            let new_pos = go(possible_direction, pos);
            if(new_pos.y < 0 || new_pos.y >= y_length || new_pos.x < 0 || new_pos.x >= x_length) {
                continue;
            }
            if (map[new_pos.y][new_pos.x] !== ' ') {
                return [possible_direction, new_pos];
            } 
        }
    }
}

var pos = {x: map[0].indexOf('|'), y: 0};
var direction = 'd';
var word = [];
var steps = 0;

for(;;) {
    let current = map[pos.y][pos.x];

    if (current === ' ') {
        break;
    }

    if (/[A-Z]/g.test(current)){
        word.push(current);
    } 

    if (current === '+') {
        let new_direction = search(direction, pos)
        direction = new_direction[0];
        pos = new_direction[1]
    } else {
        pos = go(direction, pos);
    }

    steps++;
}

console.log(word.reduce((res, elem) => {
    return res += elem;
}, ''));

console.log(steps);
