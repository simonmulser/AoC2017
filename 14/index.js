'use strict'

function hash(position, length, arr) {
    for (let i = 0; i < length/2; i++) {
        let tmp = arr[(position + i) % arr.length];
        arr[(position + i) % arr.length] = arr[(position + length - i - 1) % arr.length];
        arr[(position + length - i - 1) % arr.length] = tmp;
    }
}

function knot(position, skip, arr, lengths){
    for (let i = 0; i < lengths.length; i++) {
        hash(position, lengths[i], arr);
        position += lengths[i] + i + skip;
        position = position % arr.length;
    }
    return {'position': position, 'skip': skip + lengths.length}
}

function dense(arr) {
    arr = arr.reduce((dense, current, i) => {
        let compressed_i = Math.floor(i/16)
        if (dense.length == compressed_i) {
            dense.push(current);
        } else {
            dense[compressed_i] = dense[compressed_i] ^ current;
        }
        return dense;
    }, []);
    return arr;
}

function prefix(arr) {
    arr = arr.reduce((hex, number) => {
        let repr = number.toString(16);
        if (repr.length < 2) {
            repr = '0' + repr;
        }
        return hex += repr;
    }, '');
    return arr;
}

function bin(arr) {
    arr = arr.split('').reduce((string, hex) => {
        return string += parseInt(hex, 16).toString(2).padStart(4, '0');
    }, '');
    return arr;
}

function knothash(lengths) {
    var arr = Array.apply(null, {length: 256}).map(Number.call, Number)
    var track = {'position': 0, 'skip':0}
    for (let i = 0; i < 64; i++) {
        track = knot(track.position, track.skip, arr, lengths);
    }
    arr = dense(arr);
    arr = prefix(arr);
    arr = bin(arr);
    return arr;
} 

function mark(disk, i, j) {
    if((i - 1) >= 0 && disk[i - 1][j] == '1') {
        disk[i - 1][j] = 'X';
        mark(disk, i - 1, j);
    }
    if((i + 1) < 128 && disk[i + 1][j] == '1') {
        disk[i + 1][j] = 'X';
        mark(disk, i + 1, j);
    }
    if((j - 1) >= 0 && disk[i][j - 1] == '1') {
        disk[i][j - 1] = 'X';
        mark(disk, i, j - 1);
    }
    if((j + 1) < 128 && disk[i][j + 1] == '1') {
        disk[i][j + 1] = 'X';
        mark(disk, i, j + 1);
    }
}

const input = 'stpzcrnm';
var disk = [];

for (var i = 0; i < 128; i++) {
    let current = input + '-' + i;
    const input_lengths = current.split('').map(char => char.charCodeAt(0));
    const lengths = [...input_lengths, ...[17, 31, 73, 47, 23]];
    disk.push(knothash(lengths).split(''));
}

var count = 0;
for (var i = 0; i < 128; i++) {
    for (var j = 0; j < 128; j++) {
        if(disk[i][j] == '1'){
            mark(disk, i, j);
            count++;
        }
    }
}

console.log(count);
