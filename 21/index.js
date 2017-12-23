'use strict'
const fs = require('fs')
const arr = fs.readFileSync('input.txt', 'utf8').split('\n').map(elem => {
    let rule =  elem.split(' => ')
    return {
        pattern: rule[0].split('/').map(row => row.split('')), 
        result:  rule[1].split('/').map(row => row.split(''))
    }
});

const reverse = array => [...array].reverse();
const compose = (a, b) => x => a(b(x));

const flipMatrix = matrix => (
  matrix[0].map((column, index) => (
    matrix.map(row => row[index])
  ))
);

const rotateMatrixCounterClockwise = compose(reverse, flipMatrix);


const mutations = [rotateMatrixCounterClockwise, rotateMatrixCounterClockwise, rotateMatrixCounterClockwise, rotateMatrixCounterClockwise,
                    reverse, rotateMatrixCounterClockwise, rotateMatrixCounterClockwise, rotateMatrixCounterClockwise, rotateMatrixCounterClockwise]

var img = [
    ['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#']
];

function select(x, y, size, img) {
    let vertical = img.slice(y, y + size);
    return vertical.map(elem => elem.slice(x, x + size));
}

function transform(part) {
    for (var i = 0; i < arr.length; i++) {
        let mutation = arr[i].pattern;
        for (var j = 0; j < mutations.length; j++) {
            mutation = mutations[j](mutation)
              if (compare(part, mutation)){
                return arr[i].result;
            }          
        }
    }
    console.log('did not found a transformation')
}

function compare(first, other) {
    // if the other other is a falsy value, return
    if (!other)
        return false;

    // compare lengths - can save a lot of time 
    if (first.length != other.length)
        return false;

    for (var i = 0, l=first.length; i < l; i++) {
        // Check if we have nested arrays
        if (first[i] instanceof Array && other[i] instanceof Array) {
            // recurse into the nested arrays
            if (!compare(first[i], other[i]))
                return false;       
        }           
        else if (first[i] != other[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

for (var i = 0; i < 18; i++) {
    console.log(i);
    let size = (img.length % 2) === 0 ? 2 : 3;
    let new_img = [];
    
    for (var y = 0; y < img.length; y += size) {
        let row;
        for (var x = 0; x < img.length; x += size) {
            let part = select(x, y, size, img);
            let transformed_part = transform(part);
            if (row === undefined) {
                row = transformed_part;
            } else {
                row = row.map((elem, index) =>  ([...elem, ...transformed_part[index]]));
            }
        }
        new_img.push(...row);
    }
    img = new_img;
}

console.log(img.reduce((sum, row) => {
    return sum + row.reduce((row_sum, elem) => {
        return elem === '#' ? row_sum + 1 : row_sum;
    }, 0);
}, 0));
