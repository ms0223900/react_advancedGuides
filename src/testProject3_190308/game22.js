/* eslint-disable no-unused-vars */

const $id = (id) => document.getElementById(id)
const canvas = {
  w: 120,
  h: 140,
}
canvas.wBlocks = canvas.w / 20
canvas.hBlocks = canvas.h / 20
console.log(canvas.wBlocks)
$id('root').width = canvas.w
$id('root').height = canvas.h


const ctx = $id("root").getContext("2d")
const drawBrick = (mapN, color='#ddd') => {
  ctx.fillStyle = color
  ctx.fillRect(mapN % (canvas.wBlocks) * 20 + 1, ~~(mapN / (canvas.wBlocks)) * 20 + 1, 18, 18)
}
const convertToXY = (p) => {
  return [p % (canvas.wBlocks) * 20, ~~(p / (canvas.wBlocks)) * 20]
}
const drawPac = (p, color='#ff0') => {
  ctx.fillStyle = color
  ctx.fillRect(p[0], p[1], 18, 18)
}
const drawAll = (blocks, color) => {
  for (let i = 0; i < blocks.length; i++) {
    drawBrick(blocks[i], color)
  }
}
// collide
const checkCollide = (t, item) => {
  // if(items.indexOf(target) !== -1) {
  //   return true
  // } return false
  const itemArr = Array.isArray(item) ? item : convertToXY(item)
  const itemAttr = {
    top: itemArr[1],
    bottom: itemArr[1] + 20,
    left: itemArr[0],
    right: itemArr[0] + 20,
  }
  
  if(t[0] < itemAttr.right && 
    t[0] + 20 > itemAttr.left && 
    t[1] < itemAttr.bottom && 
    t[1] + 20 > itemAttr.top) {
    return true
  } else {
    return false
  }
}
const checkAllCollide = (t, items) => {
  for (let i = 0; i < items.length; i++) {
    if(checkCollide(t, items[i])) {
      // console.log(items[i])
      return true
    }
  }
  return false
}
// get next position
const getNextPos = (dir, posNow) => {
  switch (dir) {
    case 'up':
      return [posNow[0], posNow[1] - 2]
    case 'down':
      return [posNow[0], posNow[1] + 2]
    case 'left':
      return [posNow[0] - 2, posNow[1]]
    case 'right':
      return [posNow[0] + 2, posNow[1]]
    default:
      return [posNow[0] + 2, posNow[1]]
  }
}
const getRandom = (arr) => arr[~~(Math.random() * arr.length)]

//enemy
class enemy {
  constructor(enemyDir='right', enemyPos=[20, 100]) {
    this.enemyDir = enemyDir
    this.enemyPos = enemyPos
  }
  move() {
    //enemy move to the aisle
    const dirPosOfArr = directions.indexOf(this.enemyDir)
    const notNowDir_AndNotCollide = directions.filter(d => checkAllCollide(getNextPos(d, this.enemyPos), MAP) === false).filter(d => d !== reverseDir[dirPosOfArr])
    if(checkAllCollide(this.enemyPos, [Enemy1.enemyPos, Enemy2.enemyPos].filter(pos => pos !== this.enemyPos))) {
      this.enemyDir = reverseDir[dirPosOfArr]
    } else {
      this.enemyDir = notNowDir_AndNotCollide.length > 1 ? getRandom(notNowDir_AndNotCollide) : this.enemyDir
    }

    
    // console.log(notNowDir_AndNotCollide)

    // collid with other enemy
    

    //enemies move after colliding wall 
    if(checkAllCollide(getNextPos(this.enemyDir, this.enemyPos), MAP)) {
      const notMeReverseDir = [...reverseDir.slice(0, dirPosOfArr), ...reverseDir.slice(dirPosOfArr + 1)]
      const notMeReverseDir_AndNotCollide = notMeReverseDir.filter(d => checkAllCollide(getNextPos(d, this.enemyPos), MAP) === false)

      this.enemyDir = getRandom(notMeReverseDir_AndNotCollide)    
    }
    // console.log(this.enemyDir)
    this.enemyPos = !checkAllCollide(getNextPos(this.enemyDir, this.enemyPos), MAP) ? getNextPos(this.enemyDir, this.enemyPos) : this.enemyPos
  }
}
// const MAP = [0, 1, 2, 3, 4, 5, 9, 12, 15, 19, 20, 21, 22, 23, 24]
const MAP = [0, 1, 2, 3, 4, 5, 6, 11, 12, 14, 16, 17, 18, 23, 24, 26, 27, 28, 30, 35, 36, 37, 38, 39, 40, 41]
const directions = ['left', 'up', 'right', 'down']
const reverseDir = ['right', 'down', 'left', 'up']
const Enemy1 = new enemy('right', [20, 100])
const Enemy2 = new enemy('right', [20, 20])
const enemiesPosArr = [Enemy1.enemyPos, Enemy2.enemyPos]

const generateDots = () => {
  let arr = []
  const dotsAmount = canvas.wBlocks * canvas.hBlocks
  for (let i = 0; i < dotsAmount; i++) {
    if(MAP.indexOf(i) === -1) {
      arr = [...arr, i]
    }
  }
  console.log(arr)
  return arr
}
let DOTS = generateDots()
let posInit = false
let pacPosNow = [20, 20]
let pacEnemy = [20, 100]
let direction = 'right'
let enemyDir = 'right'
let timer




//--------------------------------------------------------


function gameStart() {
  timer = setInterval(game, 50)
}
function game() {
   // if(posInit) { drawPac(getPrevPos(direction, pacPosNow), '#fff') }
   ctx.clearRect(0, 0, canvas.w, canvas.h)
   drawAll(MAP)
   drawAll(DOTS, '#aaa')
   drawPac(pacPosNow, '#ff0')
   drawPac(Enemy1.enemyPos, '#f70')
   drawPac(Enemy2.enemyPos, '#09f')
   
  //  console.log(checkAllCollide(pacPosNow, MAP))
  pacPosNow = !checkAllCollide(getNextPos(direction, pacPosNow), MAP) ? getNextPos(direction, pacPosNow) : pacPosNow
  DOTS = checkAllCollide(pacPosNow, DOTS) ? DOTS.filter(dot => !checkCollide(pacPosNow, dot)) : DOTS

  //enemy
  Enemy2.move()
  Enemy1.move()

  //  console.log(pacPosNow)
   // pacPosNow = checkCollide(pacPosNow + 1, MAP) ? pacPosNow : pacPosNow + 1
   posInit = true
}
gameStart()




document.addEventListener('keydown', function(e) {
  direction = !checkAllCollide(getNextPos(directions[e.keyCode - 37], pacPosNow), MAP) ? directions[e.keyCode - 37] : direction
  game()
})
$id('start').onclick = gameStart
