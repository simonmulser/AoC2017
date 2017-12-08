'use strict'

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const arr = input.split('\n');

var vars = {};
var max = 0;

const operators = {
    '==': function(a, b) { return a == b },
    '<': function(a, b) { return a < b },
    '>': function(a, b) { return a > b },
    '!=': function(a, b) { return a != b },
    '<=': function(a, b) { return a <= b },
    '>=': function(a, b) { return a >= b },
};

function check(condition, vars) {
    let elements = condition.split(' ');
    if (!(elements[0] in vars)) {
        vars[elements[0]] = 0;
    }
    return operators[elements[1]](vars[elements[0]], parseInt(elements[2]));
}

function execute(instruction, vars) {
    let elements = instruction.split(' ');
    if (!(elements[0] in vars)) {
        vars[elements[0]] = 0;
    }
    if (elements[1] == 'inc') {
        vars[elements[0]] += parseInt(elements[2]);
    } else {
        vars[elements[0]] -= parseInt(elements[2]);
    }
}

function calc_max(vars) {
    let values = Object.keys(vars).map(function(key) { 
        return vars[key]; 
    });
    return Math.max.apply(null, values);
}

for (let i = 0; i < arr.length; i++) {
    let line = arr[i].split(' if ');
    let instruction = line[0]
    let condition = line[1]

    if(check(condition, vars)) {
        execute(instruction, vars);
        let tmp  = calc_max(vars)
        if (tmp > max) {
            max = tmp
        }
    }
}
console.log(max)
console.log(calc_max(vars))