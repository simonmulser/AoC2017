'use strict'
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n');
var arr = input.map(elem => {
    let coor = elem.match(/[0-9-]+/g).map(elem => parseInt(elem));
    return { 
        p: {x: coor[0], y: coor[1], z: coor[2]},
        v: {x: coor[3], y: coor[4], z: coor[5]},
        a: {x: coor[6], y: coor[7], z: coor[8]}
    }
});

function distance(particle) {
    return Math.abs(particle.p.x) + Math.abs(particle.p.y) + Math.abs(particle.p.z);
}

function move(particle) {
    particle.v.x += particle.a.x;
    particle.v.y += particle.a.y;
    particle.v.z += particle.a.z;
    particle.p.x += particle.v.x;
    particle.p.y += particle.v.y;
    particle.p.z += particle.v.z;
}

var movingAway = 0;
var lastClosestPoint;
var newClosestPoints = [];

do {
    lastClosestPoint = newClosestPoints;
    newClosestPoints = [];
    movingAway = 0;
    arr.forEach(function(elem, index){
        let old = JSON.parse(JSON.stringify(elem))
        move(elem);
        let dist = distance(elem);

        if (Math.abs(old.p.x) <= Math.abs(elem.p.x) && Math.abs(old.p.y) <= Math.abs(elem.p.y) && Math.abs(old.p.z) <= Math.abs(elem.p.z) && dist > distance(old)){
            movingAway++;
        }

        if (newClosestPoints.length === 0 || dist === newClosestPoints[0].dist){
            newClosestPoints.push({dist: dist, elem: index});
        } else {
            if (newClosestPoints[0].dist > dist) {
                newClosestPoints = [{dist: dist, elem: index}];
            }
        }
    });
} while (movingAway < arr.length || newClosestPoints.length != 1 || lastClosestPoint.length != 1 || lastClosestPoint[0].elem != newClosestPoints[0].elem);

console.log(newClosestPoints[0]);

arr = input.map(elem => {
    let coor = elem.match(/[0-9-]+/g).map(elem => parseInt(elem));
    return { 
        p: {x: coor[0], y: coor[1], z: coor[2]},
        v: {x: coor[3], y: coor[4], z: coor[5]},
        a: {x: coor[6], y: coor[7], z: coor[8]}
    }
});


// not best solution :)
for (var k = 0; k < 1000; k++) {
    arr.forEach(function(elem){
        move(elem)
    });

    for (var i = 0; i < arr.length; i++) {
        arr[i].collision = false;
        for (var j = 0; j < arr.length; j++) {
            if (i != j){
                let a = arr[i];
                let b = arr[j];
                if (a.p.x === b.p.x && a.p.y === b.p.y && a.p.z === b.p.z){
                    a.collision = true;
                }
            }
        }
    }

    arr = arr.filter(function(item) {
        return !(item.collision);
    })
}

console.log(arr.length);
