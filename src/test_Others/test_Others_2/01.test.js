const { testCollideOutter, testCollideInner, Rec1, recArea } = require('./01');

test('inner collide with recArea will be false', () => {
  expect(testCollideInner(Rec1, recArea)).toBe(false);
});
