/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
const $id = (id) => document.getElementById(id)
function rotateTetris(t, centerT, deg) {

  const toXY = (toXY) => [(toXY % 10), ~~(toXY / 10)]
  const rotateXY = (XYarr, rotateDeg) => {
    const [ x, y ] = XYarr
    const rotatedX = 
      x * (~~(Math.cos(rotateDeg) * 100) / 100) - 
      y * (~~(Math.sin(rotateDeg) * 100) / 100)
    const rotatedY = 
      x * (~~(Math.sin(rotateDeg) * 100) / 100) +
      y * (~~(Math.cos(rotateDeg) * 100) / 100) 

    return [rotatedX, rotatedY]
  }
  const txty = toXY(t)
  const center_txty = toXY(centerT)
  const txtyRePos = [txty[0] - center_txty[0], txty[1] - center_txty[1]]
  const rotatedXY = rotateXY(txtyRePos, deg)

  const rotatedXY_OriginPos = [rotatedXY[0] + center_txty[0], rotatedXY[1] + center_txty[1]]
  const rotatedXY_OriginPos_toT = rotatedXY_OriginPos[0] + rotatedXY_OriginPos[1] * 10

  return rotatedXY_OriginPos_toT
}

const ctx = document.getElementById("root").getContext("2d")

const tetrisStyles = [
  [-9, 1, 2, 3],
  [-7, 1, 2, 3],
  [-9, 0, 1, 2],
  [-10, -9, -8, -7],
  [-9, -8, 0, 1],
  [-9, -8, 1, 2],
  // [-19, -18, -9, -8, 1, 2]
]
const tetrisCenter = [ 2, 2, 1, -10, 1, 100 ]
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
const tetrisLine = (function() {
  let arr = []
  for (let i = 0; i < 20; i++) {
    arr[i] = []
    for (let j = 0; j < 10; j++) {
      arr[i][j] = j + i * 10
    }
  }
  return arr
})()
console.log(tetrisLine)

let score = 0
let dropTime = 100
let direction = 0
let rotation = 0
let tetrisNow = { pos: [], color: '', center: 0, }
let tetrisBlockAll = {
  pos: [],
  color: [],
}
let countForTimer = 0

function draw(n, color) {
	ctx.fillStyle = color;
	ctx.fillRect(n % 10 * 20 + 1, ~~(n / 10) * 20 + 1,  18, 18);
}

function clearWholeLine(arr, ...needClearArr) {
  let needClearArrs = needClearArr
  
  for (let i = 0; i < arr.length; i++) {
    let lineResult = arr[i].map(t => needClearArrs[0].includes(t))
    if(!lineResult.includes(false)) {  //if this line is all fulfill the blockAll(all true)
      console.log('a line detected')
      score += 1000
      updateScore(score)
      let newArr = [[], []]
      for (let j = 0; j < needClearArrs[0].length; j++) {
        if(!arr[i].includes(needClearArrs[0][j])) {
          newArr[0] = [...newArr[0], needClearArrs[0][j]]
          newArr[1] = [...newArr[1], needClearArrs[1][j]]
          // console.log(newArr[0])
        }
      }
      needClearArrs[0] = newArr[0].map(c => c = c < (i * 10) ? (c + 10) : c)
      needClearArrs[1] = newArr[1]
      // needClearArrs[0] = needClearArrs[0].filter(needArr => !arr[i].includes(needArr))
      // needClearArrs[1] = needClearArrs[1].filter(needArr => !arr[i].includes(needArr))
    }
  }
  return needClearArrs
}

const checkIsEvenSquare = (t) => {
  const sqrTT = Math.sqrt(t.length)
  if( t.length % 2 !== 0) {
    return false
  } else {
    let squareT = t.map(t => (t + 10) % 10)
    let sqT = []
    for (let i = 0; i < sqrTT; i++) {
      sqT[i] = squareT.slice( sqrTT * i, sqrTT * (i + 1) ).toString()
    }
    for (let j = 0; j < sqT.length; j++) {
      let next = (j >= sqrTT - 1) ? 0 : j + 1
      if(sqT[j] !== sqT[next]) {
        return false
      }
    }
    return true
  }
}
const updateScore = (s) => {
  $id('score').innerHTML = s
}

function game() {
  let timer = setInterval(() => {
    countForTimer = countForTimer + 1
    // check if a line is fulfilled
    ctx.clearRect(0, 0, 200, 400)
    let clearBlockAll = clearWholeLine(tetrisLine, tetrisBlockAll.pos, tetrisBlockAll.color)
    tetrisBlockAll = {
      pos: clearBlockAll[0],
      color: clearBlockAll[1],
    }
    
    
    


    //random tetris block
    if(tetrisNow.pos.length === 0) {
      const randomNum = ~~(Math.random() * tetrisStyles.length)
      tetrisNow = {
        pos: tetrisStyles[randomNum],
        color: colors[~~(Math.random() * colors.length)],
        center: tetrisCenter[randomNum], //temp center
      }
    }
      
    // tetris rotate
    console.log(rotation)
    if(rotation !== 0 && !checkIsEvenSquare(tetrisNow.pos)) {
      let newTetris = []
      for (let i = 0; i < tetrisNow.pos.length; i++) {
        if(tetrisNow.pos.map(t => t % 10))
        newTetris[i] = rotateTetris(tetrisNow.pos[i], tetrisNow.center, rotation)
      }
      // console.log(newTetris)
      tetrisNow.pos = newTetris
    }
    rotation = 0


    //clear old tetris
    for(let i of tetrisNow.pos) {
      if(typeof(i) === 'number') {
        draw(i, '#ddd')
      }
    }
    
    function checkCollide() {
      for(let i of tetrisNow.pos) {
        if( tetrisBlockAll.pos.indexOf(i + 1) >= 0 | tetrisBlockAll.pos.indexOf(i - 1) >= 0) {
          if(direction !== 1000) {
            direction = 0
            break
          }
        }
      }
      if(tetrisNow.pos.filter(i => i % 10 === 0).length > 0 && direction === -1) {
        direction = 0
        return
      } else if(tetrisNow.pos.filter(i => (i - 9) % 10 === 0).length > 0 && direction === 1) {
        direction = 0
        return
      }
    }
    // console.log('before', direction)
    checkCollide()
    // console.log('after', direction)
    if(direction < 1000) {
      tetrisNow = {
        pos: [...tetrisNow.pos.map(t => t + direction)],
        color: tetrisNow.color,
        center: tetrisNow.center + direction
      }
    }
    //new position, continously down
    if(direction >= 1000) {
      tetrisNow = countForTimer % 1 === 0 ? {
        pos: [...tetrisNow.pos.map(t => t + 10 )],
        color: tetrisNow.color,
        center: tetrisNow.center + 10
      } : tetrisNow
    } else {
      tetrisNow = countForTimer % 5 === 0 ? {
        pos: [...tetrisNow.pos.map(t => t + 10 )],
        color: tetrisNow.color,
        center: tetrisNow.center + 10
      } : tetrisNow
    }
    
  
  
    //collide the bottom
    let newColor = tetrisNow.pos.map(i => tetrisNow.color)
    for(let i of tetrisNow.pos) {
      if(
          (i >= 10 * 19 && i < 10 * 20) | 
          tetrisBlockAll.pos.indexOf(i + 10) >= 0)  {
        tetrisBlockAll = {
          pos: [...tetrisBlockAll.pos, ...tetrisNow.pos],
          color: [...tetrisBlockAll.color, ...newColor],
        }
        // console.log('updateBlockAll')
        tetrisNow = { pos: [], color: '', }
        break
      }
    }
    for(let i of tetrisNow.pos) {
      draw(i, tetrisNow.color)
    }
    for(let i = 0;i < tetrisBlockAll.pos.length; i++) {
      draw(tetrisBlockAll.pos[i], tetrisBlockAll.color[i])
      // console.log('drawBlockAll')
    }
    for(let i of tetrisBlockAll.pos) {
      if(i >= 0 && i < 10) {
        clearInterval(timer)
      }
    }
  }, dropTime);
}
game();


document.addEventListener('keyup', function(e) {
  const deg90 = Math.PI / 2
  direction = [0, 0, 0, 0][e.keyCode - 37] | 0
  // rotation = [-PI, 0, 0, PI / 2][e.keyCode - 65] | 0
  // console.log(rotation)
  if(e.keyCode === 65) {
    rotation = -deg90
  } else if(e.keyCode === 68) {
    rotation = deg90
  } else {
    rotation = 0
  }
  dropTime = e.keyCode === 40 ? 50 : 100
})

document.addEventListener('keydown', function(e) {
  // dropTime = e.keyCode === 40 ? 50 : 100 
  direction = [-1, 100, 1, 1000][e.keyCode - 37] | direction
})

