const $id = (id) => document.getElementById(id);
const $ = (all) => document.querySelectorAll(all);
let windowWH;
const gravity = (3528 / 20000);
const recArea = {
  left: 0,
  top: 0,
  right: 700,
  bottom: 700,
  friction: 7 * gravity,
}

window.addEventListener('load', function () {
  const window_width = parseInt(window.innerWidth);
  const window_height = parseInt(window.innerHeight);
  $id('areaW').innerHTML = window_width;
  $id('areaH').innerHTML = window_height;
  // windowWH = {left: 0, top: 0, right: window_width, bottom: window_height }
});

function Rec(el, l = '0px', t = '0px', w, h) {
  this.element = el;
  this.left = l;
  this.right = this.left + w;
  this.top = t;
  this.bottom = this.top + h;
  this.width = w;
  this.height = h;
  this.weight = this.width * this.height * 0.01;
  this.speed = {
    x: 0,
    y: 0,
  }
  this.acc = {
    x: 0,
    y: 0 + gravity,
  }
}

Rec.prototype.createRec = function () {
  if(this.element) { //test抓不到 DOM節點
    this.element.style.left = this.left + 'px';
    this.element.style.top = this.top + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.updatePosition();
  }
}

Rec.prototype.updatePosition = function () {
  let updateStatus = () => setTimeout(() => {
    this.left += this.speed.x * 1;
    this.top += this.speed.y * 1;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
    
    let speedX = this.speed.x;
    let speedY = this.speed.y;

    if(bounceCollide(Rec1, recArea) === 'H') {      
      this.speed.x = (speedX * -1) + this.acc.x;
      this.speed.y += this.acc.y;
      this.element.style.left = this.left + 'px';
      this.element.style.top = this.top + 'px';
      updateStatus();

    } else if(bounceCollide(Rec1, recArea) === 'V'){
      this.speed.x += this.acc.x;
      this.speed.y = (speedY * -1) + this.acc.y;
      this.element.style.left = this.left + 'px';
      this.element.style.top = this.top + 'px';
      updateStatus();
    } else {
      this.speed.x += this.acc.x;
      this.speed.y += this.acc.y;
      this.element.style.left = this.left + 'px';
      this.element.style.top = this.top + 'px';
      updateStatus();
    } 
    
  }, 1);
  updateStatus();
}


Rec.prototype.moveRec = function(speedX, speedY) {
  this.speed = {
    x: parseInt(speedX / 100),
    y: parseInt(speedY / 100),
  }
  this.updatePosition();
}

const Rec1 = new Rec($id('rec1'), 100, 100, 200, 100);
Rec1.createRec();
const Rec2 = new Rec($id('rec2'), 300, 100, 200, 100);
Rec2.createRec();

//---------------------------------------------------------------------------------------

//test if two objects is collided
function testCollideOutter(a, b) { 
  if(
    (a.top <= b.bottom) &&
    (a.bottom >= b.top) &&
    (a.right >= b.left) &&
    (a.left <= b.right)) {
      return true;
    }
  return false;
}
function bounceCollide(a, b) {
  console.log(a);
  if((a.top <= b.top) | (a.bottom >= b.bottom)) {
    return 'V'
  } else if((a.right >= b.right) | (a.left <= b.left)) {
    return 'H';
  } else {
    return false;
  }
}
test(Rec1);
function testCollideInner(a, b) { 
  if(
    (a.top <= b.top) |
    (a.bottom >= b.bottom) |
    (a.right >= b.right) |
    (a.left <= b.left)) {
    return true;
  } else {
    console.log(a.speed.x);
    return false;
  }
}
console.log(testCollideOutter(Rec1, Rec2)); //test OK
console.log(testCollideInner(Rec1, recArea));
// Rec1.moveRec(100, 100);




















module.exports = { testCollideOutter, testCollideInner, Rec1, recArea };
// export default Rec1;
// window.on