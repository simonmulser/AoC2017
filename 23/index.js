'use strict'
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8');

const arr = input.split('\n').map(string => {
    let arr = string.split(' ');
    return {
        'ins': arr[0],
        'a': arr[1],
        'b': arr[2],
    };
});


function get(val, registers){
    if (isNaN(parseInt(val))){
        return registers[val];
    } else {
        return parseInt(val);
    }
}

const instructions = {
    'set': function(ins, registers) {
        registers[ins.a] = get(ins.b, registers);
        return 1;
    },
    'sub': function(ins, registers) {
        registers[ins.a] -= get(ins.b, registers);
        return 1;
    },
    'add': function(ins, registers) {
        registers[ins.a] += get(ins.b, registers);
        return 1;
    },
    'mul': function(ins, registers) {
        mul_count++;
        registers[ins.a] *= get(ins.b, registers);
        return 1;
    },
    'jnz': function(ins, registers) {
        if(get(ins.a, registers) != 0) {
            return get(ins.b, registers);
        }
        return 1;
    },
};

var mul_count = 0;
var position = 0;
var registers = {a: 1};
var i = 0;

for(;;){
    let instruction = arr[position];
    if (instruction.a.match(/[a-z]+/g) != null) {
        if(!(instruction.a in registers)) {
            registers[instruction.a] = 0;
        }
    }

    let tmp = instructions[instruction.ins](instruction, registers);
    console.log(position + 1, registers)
    position += tmp;


    if(position >= arr.length) {
        break;      
    }
    i++;

    if(i === 1000) {
        break;
    }
}
