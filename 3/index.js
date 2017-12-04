"use strict"
// part one
var input = process.argv[2];
var width = 1;
var treshold = 9;
var count = 1;

for (var i = 1; i <= input; i++){
    count++;
    if (i > treshold) {
        width += 2;
        treshold += 4 * width + 4;
        console.log('width: ' + width + ' treshold: ' + treshold);
        count = 1;
    }
}

// calc horizontal steps
var h = (width + 3) / 2 - 1
console.log(h);
// calc vertical steps
var v = Math.abs(count % (width + 1) - Math.floor((width + 2) / 2))
console.log(v);

console.log(h + v);

// part two
console.log('part two')

class Field {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 1;

        var first = new Rectangle(0, 0);
        first.val = 1;
        this.arr = [];
        this.arr.push(first);
    }

    start() {
        try{
              for(;;){
                this.go_up();
                this.go_left();
                this.go_down();
                this.go_right();
            }
        } catch(err){
            console.log('found: ' + err)
        }       


    }

    go_right(){
        do{
            this.x++;
            this.add()
        } while(this.x < this.width);
        this.width++;
    }

    go_up(){
        this.x++
        this.add()
        do{
            this.y++;
            this.add()
        } while(this.y < this.width);
    }

    go_left(){
        do{
            this.x--;
            this.add()
        } while(Math.abs(this.x) < this.width);
    }

    go_down(){
        do{
            this.y--;
            this.add()
        } while(Math.abs(this.y) < this.width);
    }

    add(){
        var r = new Rectangle(this.x, this.y, this.width)
        r.val = this.calc(r)
        //console.log(this.x + ';' + this.y + "=" + r.val)
        if(r.val > 312051){
            throw r.val
        }
        this.arr.push(r)
    }

    calc(new_elem){
        var val = 0
        for (var i = this.arr.length; i > 0; i--){
            var elem  = this.arr[i - 1];

            //console.log('elem: ' + elem.x + ';' + elem.y + '=' + elem.val + ' new_elem: ' + new_elem.x + ';' + new_elem.y)
            if (elem.width < new_elem.width - 1) {
                break;
            }

            if (Math.abs(elem.x - new_elem.x) < 2 && Math.abs(elem.y - new_elem.y) < 2){
                val += elem.val;
            }
            //console.log(val)
        }
        return val;
    }
};

class Rectangle {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width
  }
}


var f = new Field()
f.start()
console.log(f.arr.length)

