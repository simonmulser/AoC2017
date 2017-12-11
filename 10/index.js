'use strict'

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const input_lengths = input.split('').map(char => char.charCodeAt(0));
const lengths = [...input_lengths, ...[17, 31, 73, 47, 23]];
var arr = Array.apply(null, {length: 256}).map(Number.call, Number)

function hash(position, length, arr) {
    for (let i = 0; i < length/2; i++) {
        let tmp = arr[(position + i) % arr.length];
        arr[(position + i) % arr.length] = arr[(position + length - i - 1) % arr.length];
        arr[(position + length - i - 1) % arr.length] = tmp;
    }
}

function knot(position, skip, arr){
    for (let i = 0; i < lengths.length; i++) {
        hash(position, lengths[i], arr);
        position += lengths[i] + i + skip;
        position = position % arr.length;
    }
    return {'position': position, 'skip': skip + lengths.length}
}

var track = {'position': 0, 'skip':0}
for (let i = 0; i < 64; i++) {
    track = knot(track.position, track.skip, arr);
}

const dense = arr.reduce((dense, current, i) => {
    let compressed_i = Math.floor(i/16)
    if (dense.length == compressed_i) {
        dense.push(current);
    } else {
        dense[compressed_i] = dense[compressed_i] ^ current;
    }
    return dense;
}, []);

const result = dense.reduce((hex, number) => {
    let repr = number.toString(16);
    if (repr.length < 2) {
        repr = '0' + repr;
    }
    return hex += repr;
}, '');

console.log(result);
