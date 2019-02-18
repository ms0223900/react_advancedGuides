/* eslint-disable no-unused-vars */
const ctx = document.getElementById("root").getContext("2d");
function draw(n, color) {
	ctx.fillStyle = color;
	ctx.fillRect(n % 10 * 20 + 1, ~~(n / 10) * 20 + 1,  18, 18);
}
const tetrisStyles = [
  [-9, 1, 2, 3],
  [-9, 0, 1, 2],
  [-10, -9, -8, -7],
  [-9, -8, 0, 1]
]
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
let dropTime = 100
let direction = 0


let tetrisNow = { pos: [], color: '', }
let tetrisBlockAll = {
  pos: [],
  color: [],
}
let timer = setInterval(() => {
  
  //random tetris block
  tetrisNow = 
    tetrisNow.pos.length === 0 ? 
    {
      pos: tetrisStyles[~~(Math.random() * 4)],
      color: colors[~~(Math.random() * colors.length)]
    } : 
    tetrisNow 

  //clear old tetris
  for(let i of tetrisNow.pos) {
    if(typeof(i) === 'number') {
      draw(i, '#ddd')
    }
  }

  //new position, continously down
  tetrisNow = {
    pos: [...tetrisNow.pos.map(t => t + 10 + direction)],
    color: tetrisNow.color,
  }


  //collide the bottom
  let newColor = tetrisNow.pos.map(i => tetrisNow.color)
  console.log(newColor)
  for(let i of tetrisNow.pos) {
    if((i >= 10 * 19 && i < 10 * 20) | tetrisBlockAll.pos.indexOf(i + 10) >= 0) {
      tetrisBlockAll = {
        pos: [...tetrisBlockAll.pos, ...tetrisNow.pos],
        color: [...tetrisBlockAll.color, ...newColor],
      }
      console.log(tetrisBlockAll)
      tetrisNow = { pos: [], color: '', }
      break
    }
  }
  for(let i of tetrisNow.pos) {
    draw(i, tetrisNow.color)
  }
  for(let i = 0;i < tetrisBlockAll.pos.length; i++) {
    draw(tetrisBlockAll.pos[i], tetrisBlockAll.color[i])
  }
  for(let i of tetrisBlockAll.pos) {
    if(i >= 0 && i < 10) {
      clearInterval(timer)
    }
  }
}, dropTime);

document.addEventListener('keyup', function(e) {
  console.log(e)
  direction = [0, 0, 0, 0][e.keyCode - 37] | 0
  dropTime = e.keyCode === 40 ? 50 : 100
})

document.addEventListener('keydown', function(e) {
  // dropTime = e.keyCode === 40 ? 50 : 100 
  direction = [-1, 100, 1, 0][e.keyCode - 37] | direction
})
