'use strict'
const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
const arr = input.split(',');

function toString(arr){
    return programs.reduce((string, element) => { return string += element }, '');
}

var programs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
const start = toString(programs)
//var programs = ['a', 'b', 'c', 'd', 'e'];

var i = 1;
while (i <= 1000000000) {
    arr.forEach(function(element){
        switch(element.charAt(0)){
            case 's':
                let spin = parseInt(element.match(/[0-9]+/g)[0]) % programs.length;
                programs = [...programs.slice(programs.length - spin, programs.length), ...programs.slice(0, programs.length - spin)];
                break;
            case 'x':
                let positionsToSwitch = element.match(/[0-9]+/g).map(a => (parseInt(a)));

                let tmp = programs[positionsToSwitch[0]];
                programs[positionsToSwitch[0]] = programs[positionsToSwitch[1]];
                programs[positionsToSwitch[1]] = tmp;
                break;
            default:
                let programsToSwitch = element.slice(1).match(/[a-p]/g).map(a => (programs.indexOf(a)));

                let tmp2 = programs[programsToSwitch[0]];
                programs[programsToSwitch[0]] = programs[programsToSwitch[1]];
                programs[programsToSwitch[1]] = tmp2;
                break;
        }
    });
    
    let order = toString(programs)
    if (order == start) {
        console.log('i: ' + i);
        console.log(1000000000%i)
        i = 1000000000 - (1000000000 % i);
        console.log('i: ' + i);
    }
    i++;
}

console.log(toString(programs));

