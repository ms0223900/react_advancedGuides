const $id = (id) => document.getElementById(id)
const $class = (name) => document.getElementsByClassName(name)
const $all = (all) => document.querySelectorAll(all)

let posNow = [0, 0]
let divCenter = [0, 0]
let ANGLE = 0

const getVector = (A=[0, 0], B=[0, 0]) => [B[0] - A[0], B[1] - A[1]]
const getVectorLength = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1])

const getPos = () => {
  let timer = setInterval(() => {
    pos1 = pos2
    pos2 = posNow
    const posV = getVector(pos1, pos2)
    $id('panel01').innerHTML = pos1
    $id('panel02').innerHTML = pos2
    $id('panel03').innerHTML = posV
    
    if((posV[0] > 0 && posV[1] < 0) || (posV[0] > 0 && posV[1] > 0)) {
      console.log('逆')
    } else if((posV[0] < 0 && posV[1] > 0) || (posV[0] < 0 && posV[1] < 0)) {
      console.log('順')
    }


    const pos1_v = getVector(divCenter, pos1)
    const pos2_v = getVector(divCenter, pos2)
    let getAngle = Math.acos( (pos1_v[0] * pos2_v[0] + pos1_v[1] * pos2_v[1]) / (getVectorLength(pos1_v) * getVectorLength(pos2_v)) ) * (180 / Math.PI)
    let angle
    if(posNow[1] > divCenter[1]) {
      angle = pos2_v[0] < pos1_v[0] ? getAngle * 1 : getAngle * -1
    } else {
      angle = pos2_v[0] < pos1_v[0] ? getAngle * -1 : getAngle * 1
    }
    ANGLE += angle || 0
    $id('rotateDiv').style.transform = `rotate(${ANGLE}deg)`
    console.log(angle)
  }, 1)
}


window.onload = () => {
  const divPos = $id('rotateDiv').getBoundingClientRect()
  divCenter = [divPos.left + divPos.width / 2, divPos.top + divPos.height / 2]
  console.log(divCenter)
  document.addEventListener('mousemove', (e) => {
    const posX = e.clientX
    const posY = e.clientY
    // console.log(e.clientX)
    // console.log(e.clientY)
    posNow = [posX, posY]
  })
}
getPos()

const getDOMpos = (el) => {
  
}




let pos1 = [0, 0]
let pos2 = [0, 0]

