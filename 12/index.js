'use strict'
const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
var arr = input.split('\n').map(x => {
    let parse = x.match(/[0-9]+/g);
    return {'id': parseInt(parse[0]), 'pipes': parse.slice(1).map(y => parseInt(y))};
});

function add(id, reachable) {
    let pipes = arr[id].pipes;
    for (let i = 0; i < pipes.length; i++) {
        if (!reachable.includes(pipes[i])){
            reachable.push(pipes[i]);
            add(pipes[i], reachable);
        }
    }
    return(reachable);
}

var count = 0;
var reachable  = new Set([]);
for (var i = 0; i < arr.length; i++) {
    if (!reachable.has(arr[i].id)){
        let group = add(i, []);
        //console.log(group);

        reachable = new Set([...group, ...reachable]);
        count++;
    }
}
console.log(count)

