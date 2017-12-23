'use strict'

let b = 105700;
let h = 0;


 function is_composite(n) {
    if (n % 2 === 0 || n % 3 === 0){
        return true;
    }
    let i = 5;
    while (i * i <= n) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return true;
        }
        i += 6;   
    }

    return false;
 }


for(let b = 105700; b <= 122700; b += 17) {
    if(is_composite(b)){
        h++;
    }
}

console.log(h);