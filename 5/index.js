var fs = require('fs')

var input = fs.readFileSync('input.txt', 'utf8')
var arr = input.split('\n').map(function(item){
    return parseInt(item, 10);
});

//console.log(arr)

var position = 0;
var steps = 0;
do {
    //console.log('position: ' + position + ', arr[position]: ' + arr[position])
    
    var tmp = position + arr[position];
    arr[position] > 2 ? arr[position]-- : arr[position]++;
    position = tmp;

    steps++;
} while (position < arr.length)

console.log(arr)

console.log(steps);
