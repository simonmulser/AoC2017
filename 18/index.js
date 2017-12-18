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


var state = [
    {registers: {p: 0}, position: 0, queue: [], sent: 0},
    {registers: {p: 1}, position: 0, queue: [], sent: 0}
];

function get(val, registers){
    if (isNaN(parseInt(val))){
        return registers[val];
    } else {
        return parseInt(val);
    }
}

const instructions = {
    'snd': function(ins, registers) {
        return 1;
    },
    'rcv': function(ins, registers) {
        return 1;
    },
    'set': function(ins, registers) {
        registers[ins.a] = get(ins.b, registers);
        return 1;
    },
    'add': function(ins, registers) {
        registers[ins.a] += get(ins.b, registers);
        return 1;
    },
    'mul': function(ins, registers) {
        registers[ins.a] *= get(ins.b, registers);
        return 1;
    },
    'mod': function(ins, registers) {
        registers[ins.a] %= get(ins.b, registers);
        return 1;
    },
    'jgz': function(ins, registers) {
        if(get(ins.a, registers) > 0) {
            return get(ins.b, registers);
        }
        return 1;
    },
};

var pid = 0;

for(;;){
    let current = state[pid];
    let other = state[(pid + 1) % 2];
    let instruction = arr[current.position];

    if (instruction.a.match(/[a-z]+/g) != null) {
        if(!(instruction.a in current.registers)) {
            current.registers[instruction.a] = 0;
        }
    }

    if (instruction.ins === 'rcv') {
        if (current.queue.length > 0){
            let val = current.queue.splice(0, 1)[0];
            current.registers[instruction.a] = val;
        } else {
            if(other.queue.length === 0) {
                break;
            } else {
                pid = (pid + 1) % 2;
                continue;
            }
        }
    }

    if (instruction.ins === 'snd') {
        current.sent++;
        other.queue.push(get(instruction.a, current.registers));
    }

    current.position += instructions[instruction.ins](instruction, current.registers);

    if(current.position >= arr.length) {
        break;      
    }
}

console.log(state[1].sent);
