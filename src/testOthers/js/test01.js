// 1. this in normal function

function fn1() {
  console.log(this);
}
function fn2() {
  return obj1.e.c();
}

let obj1 = {
  a: fn1,
  b: fn2,
  e: {
    c: () => console.log(this),
  },
  
  d: '',
}



class OBJ2 {
  constructor(obj) {
    this.a = obj.a;
    this.d = () => {
      console.log(this);
    }
  }
  


}
fn1(); //window物件
obj1.a(); //obj
new OBJ2({a: 'a'}).d(); //OBJ2

//---------------------------------------------------------------------------------------

//2. this in arrow function(global)

fn2(); //window
obj1.b(); //window




//3. arrow function in object
obj1.e.c(); //還是window


let fn3 = () => setTimeout(() => {
  console.log('fn3: ' + this.constructor.name);
}, 0);

let fn4 = function () {
  setTimeout(() => {
    console.log('fn4: ' + this.constructor.name);
  }, 10);
}
let fn6 = function () {
  setTimeout(function() {
    console.log('fn6: ' + this.constructor.name);
  }, 0);
}
let fn5 = {
  f1: fn4,
  fn4: fn4,
  fn6: fn6,
}


fn3(); //window
fn4(); //window
fn6(); //window
fn5.f1(); //fn5 這個物件
fn5.fn4(); //fn5 這個物件
fn5.fn6(); //window 物件

//4. 
// new OBJ2.d();

//---------------------------------------------------------------------------------------
