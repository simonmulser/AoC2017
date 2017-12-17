'use strict'

class Element {
    constructor(name, weight, children){
        this.name = name;
        this.weight = weight;
        this.children = children;
    }
}

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
var map = input.split('\n')
.reduce(function(map, item){
    let name = item.match(/^[a-z]+/g)[0];
    let weight = parseInt(item.match(/[0-9]+/g)[0]);
    let children = item.match(/[a-z]+/g);
    children.splice(children.indexOf(name), 1);
    map[name] = new Element(name, weight, children);
    return map;
}, {});

var children = new Map();
var potential = []
for (var key in map) {
    let elem =  map[key];
    if(!children.has(elem.name)) {
        potential.push(elem.name)
    }
    for (let j = 0; j < elem.children.length; j++) {
        children.set(elem.children[j], null)
    }
}

var bottom;

for (let i = 0; i < potential.length; i++) {
    if(!children.has(potential[i])) {
       bottom = potential[i];
    }
}

console.log(bottom);

calcWeight(bottom, map);

function calcWeight(id, map) {
    let elem = map[id];
    if(elem.children.length > 0) {
        let weights = elem.children.map(child => calcWeight(child, map));
        if(!weights.reduce(function(a, b){ return (a === b) ? a : NaN; })){
            console.log(weights);
            console.log(elem.children);
        }
        return elem.weight + weights.reduce(function(sum, weight){return sum + weight;}, 0);
    } else {
        return elem.weight;
    }
}
