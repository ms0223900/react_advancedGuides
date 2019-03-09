function rotateTetris(t, centerT, deg) {
  const toXY = (toXY) => [(toXY % 10), ~~(toXY / 10)]
  const rotateXY = (XYarr, rotateDeg) => {
    const [ x, y ] = XYarr
    const rotatedX = 
      x * (~~(Math.cos(rotateDeg) * 100) / 100) - 
      y * (~~(Math.sin(rotateDeg) * 100) / 100) * (-1) //yAxis reverse
    const rotatedY = 
      x * (~~(Math.sin(rotateDeg) * 100) / 100) * (-1) + //yAxis reverse
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
export { rotateTetris }