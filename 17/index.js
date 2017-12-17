var arr = [0];
var position = 0;
const step = 335;


for (var i = 1; i < 2018; i++) {
    position = (position + step) % arr.length + 1;
    arr.splice(position, 0, i);
}

console.log(arr[position + 1]);


position = 0;
var position_zero = 0;
var virtual_length = 1;
var current;

for (var i = 1; i < 50000001; i++) {
    position = (position + step) % virtual_length + 1;
    if (position == position_zero) {
        position_zero++;
    }
    if (position == position_zero + 1) {
        current = i;
    }

    virtual_length++;
}

console.log(current);

