'use strict'
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8');

const walk = [
    function(position){
        position.y--;
    },
    function(position){
        position.x++;
    }, 
    function(position){
        position.y++;
    },
    function(position){
        position.x--;
    }
];

function print(arr) {
    let tmp = arr.reduce((string, elem) => {
        return string += elem.reduce((string, elem) => {
            return string += elem;
        }, '') + '\n';
    }, '')

    console.log(tmp);
    console.log('---');
}

function extend(map) {
    map.push(Array(map[0].length).fill('.'));
    map.splice(0, 0, Array(map[0].length).fill('.'));

    map.forEach(function(elem){
        elem.push('.');
        elem.splice(0, 0, '.');

    });
}

var map = input.split('\n').map(elem => elem.split(''));
var position = {y: Math.ceil(map.length / 2), x: Math.ceil(map.length / 2)}
var direction = 0;
var count = 0;

for (var i = 0; i < 10000; i++) {
    if(position.y < 0 || position.x < 0 || position.y >= map.length || position.x >= map.length) {
        extend(map);
        position.x++;
        position.y++;
    }
    if(map[position.y][position.x] === '.') {
        map[position.y][position.x] = '#'
        count++;
        direction = direction === 0 ? 3 : direction - 1;
    } else {
        map[position.y][position.x] = '.'
        direction = ((direction + 1) % 4);
    }

    walk[direction](position);

}
console.log(position)
console.log(count);
