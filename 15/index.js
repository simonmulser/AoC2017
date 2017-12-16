'use strict'
var generatorA = 703;
var generatorB = 516;

function genA(number) {
    do {
        number = (number * 16807) % 2147483647;
    } while (number % 4 != 0);
    return number;
}

function genB(number) {
    do {
        number = (number * 48271) % 2147483647;
    } while (number % 8 != 0);
    return number;
} 

var count = 0;
for (var i = 0; i < 40000000; i++) {
    generatorA = genA(generatorA)
    generatorB = genB(generatorB)
    let binaryA = generatorA.toString(2);
    let binaryB = generatorB.toString(2);
    if (binaryA.slice(binaryA.length - 16) == binaryB.slice(binaryB.length - 16)) {
        count++;
    }
}

console.log(count);
