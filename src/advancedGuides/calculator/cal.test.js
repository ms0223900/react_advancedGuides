const cal = require('./cal.js');
let myCal = new cal(1, 2);

test('test add: 1 + 2 = 3', () => {
  expect(myCal.add()).toBe(3);
});

it('test substraction: 1 - 2 = -1', () => {
  expect(myCal.minus()).toBe(-1);
});

it('test mAdd: 1 + 2 = 3, memory add it to an array', () => {
  expect(myCal.mAdd()).toEqual([3]);
});

it('test mAdd: push 3 into memory array', () => {
  expect(myCal.mAdd()).toEqual([3, 3]);
});

it('test mMinus: push -1 into memory array', () => {
  expect(myCal.mMinus()).toEqual([3, 3, 1]);
});

it('test mResult: calculate all memory to result', () => {
  expect(myCal.mResult()).toBe(7);
})

