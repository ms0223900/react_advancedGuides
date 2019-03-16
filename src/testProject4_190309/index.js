/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
const $id = (id) => document.getElementById(id)
const $class = (name) => document.getElementsByClassName(name)
const $all = (all) => document.querySelectorAll(all)


// let divCenter = [0, 0]
// let a1 = 0
// let a2 = 0
// let isClick = false
// let originAngle = 0

const getVector = (A=[0, 0], B=[0, 0]) => [B[0] - A[0], B[1] - A[1]]
const getVectorLength = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1])
const getAngle = (v1, v2) => 
  Math.acos((v1[0] * v2[0]) + (v1[1] * v2[1]) / getVectorLength(v1) * getVectorLength(v2)) * 
  (180 / Math.PI)


window.onload = () => {
  const rotateDIV = new rotateEL('#rotateDiv', false)
  rotateDIV.init()
  document.addEventListener('mousedown', (e) => {
    const { clientX, clientY } = e
    rotateDIV.startRotate(clientX, clientY)
  })
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e
    rotateDIV.rotateTheElement(clientX, clientY)
  })
  document.addEventListener('mouseup', () => {
    rotateDIV.endRotate()

  })
  
}
function getProperty(el) { $all(el).style.transform = `rotate(30deg)`  }
class rotateEL {
  constructor(el='div', isClick=false, a1=0, a2=0, originAngle=0 ) {
    this.a1 = a1
    this.a2 = a2
    this.isClick = isClick
    this.originAngle = originAngle
    this.ANGLE = 0
    this.el = $all(el)[0]
    this.centerPos = [0, 0]
  }
  startRotate(posX, posY) {
    this.isClick = true
    this.a1 = getAngleFrom0(posX, posY,  this.centerPos)
    this.originAngle = this.el.style.transform.match(/\d|\./gi).join('') * 1
  }
  init() {
    this.getCenter()
    this.el.style.transform = `rotate(0deg)`
  }
  endRotate() {
    this.a1 = 0
    this.a2 = 0
    this.isClick = false
  }
  rotateTheElement(posX, posY) {
    if(this.isClick) {
      this.a2 = getAngleFrom0(posX, posY, this.centerPos)
      const rotateDeg = this.a2 - this.a1
      this.el.style.transform = `rotate(${this.originAngle + rotateDeg}deg)`
    }
  }
  getCenter() {
    const divPos = this.el.getBoundingClientRect()
    const divCenter = [divPos.left + divPos.width / 2, divPos.top + divPos.height / 2]
    this.centerPos = divCenter
  }
}
function getAngleFrom0(posX, posY, elCenter) {
  const posNow = [posX, posY]
  const vectorNow = getVector(elCenter, posNow)
  const vectorCenter = [0, -1]
  const ANGLE = vectorNow[0] > vectorCenter[0] ? 
    getAngle(vectorNow, vectorCenter) : 
    360 - getAngle(vectorNow, vectorCenter) 
  return ANGLE
}