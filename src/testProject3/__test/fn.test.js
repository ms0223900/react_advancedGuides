import { rotateTetris } from '../functions'

describe('testFunction', () => {
  it('test rotate function', () => {
    expect(rotateTetris(2, 11, -Math.PI / 2)).toBe(22)
  })

  it('test rotate function', () => {
    expect(rotateTetris(1, 11, -Math.PI / 2)).toBe(12)
  })
})
