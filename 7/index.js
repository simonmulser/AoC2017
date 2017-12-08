'use strict'

class Element {
    constructor(name, value, children){
        this.name = name;
        this.value = value;
        this.children = children;
    }
}

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
var arr = input.split('\n')
.map(function(item){
    let name = item.match(/^[a-z]+/g)[0];
    let value = item.match(/[0-9]+/g)[0];
    let children = item.match(/[a-z]+/g);
    children.splice(children.indexOf(name), 1);
    return new Element(name, value, children);
})

var children = new Map();
var potential = []
for (let i = 0; i < arr.length; i++) {
    let elem =  arr[i];
    if(!children.has(elem.name)) {
        potential.push(elem.name)
    }
    for (let j = 0; j < elem.children.length; j++) {
        children.set(elem.children[j], null)
    }
}

for (let i = 0; i < potential.length; i++) {
    if(!children.has(potential[i])) {
        console.log(potential[i])
    }
}
