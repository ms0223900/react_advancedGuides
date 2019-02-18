const $id = (id) => document.getElementById(id);
const $ = (all) => document.querySelectorAll(all);

const canvas = $id('canvas01');
const canvasW = canvas.width;
const canvasH = canvas.height;

const canvas_friction = 0.97;
const ctx = canvas.getContext('2d');
const bounce = false;
let isPressed = false;

class drawItems {
  // isPressed = false;
  constructor(x = canvasW / 2, y = 0, vx = 10, vy = 10) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.accX = 0;
    this.g = 980 / 1000;
    this.useG = true;
    // this.canPressed = true;
    this.isCollideWithOthers = false;
    this.staticObj = [];
  }
  setNoG() {
    this.g = false;
  }
  addRec(x = 2 * canvasW / 3, y = 2 * canvasH / 3, w = 200, h = 20) {
    let newObj = {
      x: x,
      y: y,
      w: w,
      h: h
    };
    this.staticObj = [...this.staticObj, newObj];
    return this;
  }
  renderStaticObj() {
    // ball position
    let right = this.x + this.vx + this.r; 
    let left  = this.x + this.vx - this.r;
    let top = this.y + this.vy - this.r;
    let bottom = this.y + this.vy / 2 +  this.r;

    for(let obj of this.staticObj) {
      this.drawRec('#000', obj.x, obj.y, obj.w, obj.h); 
    }
    for(let obj of this.staticObj) {
      //checkCollide
      if(top <= obj.y + obj.h && right >= obj.x && left <= obj.x + obj.w && bottom >= obj.y ) {
        this.vx *= canvas_friction;
        this.vy = 0;
        this.isCollideWithOthers = true;
        break;
      }
      else {
        // $id('log1').innerHTML = 'px';
        this.isCollideWithOthers = false;
      }
    }
    $id('log1').innerHTML = this.isCollideWithOthers;
    if(!this.isCollideWithOthers) {
      if(this.useG) {
        this.vy += this.g;
      }
    }
  }
  createBall(color, r) {
    this.color = color;
    this.r = r;
    this.updateFrame();
  }
  createRec(color, w, h) {
    this.color = color;
    this.w = w;
    this.h = h;
    this.updateFrame();
  }
  drawBall(color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.draw(color);
  }
  drawRec(color='#000', x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    this.draw(color);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  move(e) {
    //jump
    if(e.keyCode === 38 && this.vy === 0) {
      this.vy = -20;
    }
    // walk
    if(e.keyCode === 37) {
      this.accX = -0.4;
    } else if(e.keyCode === 39) {
      this.accX = 0.4;
    }
    if(this.vx <= 10) {
      this.vx += this.accX;
    }
  }
  checkCollide() {
    let right = this.x + this.vx + this.r; 
    let left  = this.x + this.vx - this.r;
    let top = this.y + this.vy - this.r;
    let bottom = this.y + this.vy + this.r;

    const checkWithWall = () => {
      if(right >= canvasW ||  left <= 0) {
        this.vx *= -1;
        this.vx *= canvas_friction;
      } else if (bottom >= canvasH || top <= 0) {
        if(bounce) {
          this.vy *= -1;
        } else {
          this.vy = 0;
          this.y = canvasH - this.r;
        }
        this.vy *= canvas_friction;
      }
    }
    
    checkWithWall();
    // checkWithOthers();
  }
  handlePosition() {
    if(this.y + this.r >= canvasH && Math.abs(this.vy) <= 1) {
      this.vy = 0;
      this.y = canvasH - this.r;
      this.vx *= canvas_friction;
    } this.x += this.vx;
    this.y += this.vy;
  }
  updateFrame() {
    let anime = setInterval(() => {
      console.log('aaa');
      ctx.clearRect(0, 0, canvasW, canvasH);
      console.log(this.staticObj);
      this.drawBall(this.color); 
      this.renderStaticObj();
      this.checkCollide();
      this.handlePosition();
      // if(parseInt(this.vx * 1000) === 0 && (this.vy === 0)) {
      //   clearInterval(anime);
      // }       
    }, 10); 
  } 
}




let myBall01 = new drawItems(30, 20, 10, 10);
myBall01.createBall('#345', 20);
myBall01.addRec().addRec(200, 300, 100, 20).addRec(350, 120, 160, 20);
// [100, 200, 100, 20];
// let myBrick = new drawItems(100, 200, 0, 0);
// myBrick.createRec('#345', 100, 20);

document.addEventListener('keydown', function(e) {
  myBall01.move(e);
});
// document.addEventListener('keydown', myBall01.jump);


