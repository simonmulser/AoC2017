var arr = [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6];
var map = new Map();
var steps = 0;

do {
     maxIndex = arr.reduce((bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, array) => currentlyTestedValue > array[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar, 0);
     var val = arr[maxIndex];
     arr[maxIndex] = 0;

     for (var i = 0; i < val; i++) {
        arr[(maxIndex + i + 1) % arr.length]++
     }
     steps++;

     if (map.has(arr.toString())) {
        break;
     }
     map.set(arr.toString(), steps)

} while (true)

console.log(arr)
console.log(steps)
console.log(steps - map.get(arr.toString()))