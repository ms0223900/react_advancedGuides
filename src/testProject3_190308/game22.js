/* eslint-disable no-unused-vars */

const $id = (id) => document.getElementById(id)
$id('root').width = '100'
$id('root').height = '100'

const ctx = $id("root").getContext("2d")

const drawBrick = (mapN, color='#ddd') => {
  ctx.fillStyle = color
  ctx.fillRect(mapN % (100 / 20) * 20 + 1, ~~(mapN / (100 / 20)) * 20 + 1, 18, 18)
}
const convertToXY = (p) => {
  return [p % (100 / 20) * 20, ~~(p / (100 / 20)) * 20]
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
      console.log(items[i])
      return true
    }
  }
  return false
}
console.log(checkCollide([59, 20], 9))

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
const getPrevPos = (dir, posNow) => {
  switch (dir) {
    case 'up':
      return [posNow[0], posNow[1] + 2]
    case 'down':
      return [posNow[0], posNow[1] - 2]
    case 'left':
      return [posNow[0] + 2, posNow[1]]
    case 'right':
      return [posNow[0] - 2, posNow[1]]
    default:
      return [posNow[0] - 2, posNow[1]]
  }
}



const MAP = [0, 1, 2, 3, 4, 5, 9, 12, 15, 19, 20, 21, 22, 23, 24]
let posInit = false
let pacPosNow = [20, 20]
let direction = 'right'


function drawMap() {
  for (let i = 0; i < MAP.length; i++) {
    drawBrick(MAP[i])
  }
}
drawMap()

function game() {
  let timer = setInterval(() => {
    // if(posInit) { drawPac(getPrevPos(direction, pacPosNow), '#fff') }
    ctx.clearRect(0, 0, 100, 100)
    drawMap()
    drawPac(pacPosNow, '#ff0')
    
    console.log(checkAllCollide(pacPosNow, MAP))
    pacPosNow = !checkAllCollide(getNextPos(direction, pacPosNow), MAP) ? getNextPos(direction, pacPosNow) : pacPosNow
    console.log(pacPosNow)
    // pacPosNow = checkCollide(pacPosNow + 1, MAP) ? pacPosNow : pacPosNow + 1
    posInit = true
  }, 50)
}
game()


document.addEventListener('keyup', function(e) {
  direction = ['left', 'up', 'right', 'down'][e.keyCode - 37]
})
