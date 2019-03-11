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

// collide
const checkCollide = (t, item) => {
  // if(items.indexOf(target) !== -1) {
  //   return true
  // } return false
  const itemArr = convertToXY(item)
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
// console.log(checkCollide([59, 20], 9))

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



// const MAP = [0, 1, 2, 3, 4, 5, 9, 12, 15, 19, 20, 21, 22, 23, 24]
const MAP = [0, 1, 2, 3, 4, 5, 6, 11, 14, 16, 17, 20, 23, 24, 26, 27, 28, 30, 35, 36, 37, 38, 39, 40, 41]
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
let pacDir = 'right'


function drawAll(blocks, color) {
  for (let i = 0; i < blocks.length; i++) {
    drawBrick(blocks[i], color)
  }
}

drawAll(MAP)
let timer
function gameStart() {
  timer = setInterval(game, 50)
}
function game() {
   // if(posInit) { drawPac(getPrevPos(direction, pacPosNow), '#fff') }
   ctx.clearRect(0, 0, canvas.w, canvas.h)
   drawAll(MAP)
   drawAll(DOTS, '#aaa')
   drawPac(pacPosNow, '#ff0')
   drawPac(pacEnemy, '#f70')
   
  //  console.log(checkAllCollide(pacPosNow, MAP))
  pacPosNow = !checkAllCollide(getNextPos(direction, pacPosNow), MAP) ? getNextPos(direction, pacPosNow) : pacPosNow
  DOTS = checkAllCollide(pacPosNow, DOTS) ? DOTS.filter(dot => !checkCollide(pacPosNow, dot)) : DOTS

  if(checkAllCollide(getNextPos(pacDir, pacEnemy), MAP)) {
    pacDir = ['left', 'up', 'right', 'down'][~~(Math.random() * 4)]
  }
  console.log(pacDir)
  pacEnemy = !checkAllCollide(getNextPos(pacDir, pacEnemy), MAP) ? getNextPos(pacDir, pacEnemy) : pacEnemy
  
  //  console.log(pacPosNow)
   // pacPosNow = checkCollide(pacPosNow + 1, MAP) ? pacPosNow : pacPosNow + 1
   posInit = true
}
gameStart()


document.addEventListener('keydown', function(e) {
  direction = !checkAllCollide(getNextPos(['left', 'up', 'right', 'down'][e.keyCode - 37], pacPosNow), MAP) ? ['left', 'up', 'right', 'down'][e.keyCode - 37] : direction
  game()
})
