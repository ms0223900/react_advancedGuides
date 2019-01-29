const cal = require('./cal_v2.js');
let myCal = new cal();

test('add numbers: 1 + 2 = 3', () => {
  expect(myCal.num(1).add(2).equalTo().result).toBe(3);
});


// myCal.mClear(); 
it('clear to zero: 0', () => {
  expect(myCal.mClear()).toBe(0); 
});
it('add numbers: 1 + 2 - 3 + 3 = 3', () => {
  expect(myCal.num(1).add(2).minus(3).add(3).equalTo().result).toBe(3);
});


it('clear to zero: 0', () => {
  expect(myCal.mClear()).toBe(0); 
});
//四則運算(1)
it('multi numbers: 1 * 2 + 3 / 4', () => {
  expect(myCal.num(1).multi(2).add(3).devide(4).equalTo().result).toBeCloseTo(2.75);
});
//四則運算(2)
it('multi numbers: 2 * 3 + 4 = 24', () => {
  expect(myCal.num(2).multi(3).add(4).equalTo().result).toBe(10);
});


//mAdd after calculated
it('memory add last result', () => {
  expect(myCal.mAdd().m).toEqual([10]);
});

// mAdd directly calculated
it('memory add directly: 1 + 10 = 11', () => {
  expect(myCal.num(1).add(10).mAdd().m).toEqual([10, 11]);
});

// mMinus directly calculated
it('memory minus directly: 0 + 10 = 10', () => {
  expect(myCal.num(0).add(10).mMinus().m).toEqual([10, 11, -10]);
});

// mResult 
it('memory result : 10 + 11 - 10 = 11', () => {
  expect(myCal.mResult().result).toEqual(11);
});

// myCal.mClear(); 
it('clear to zero: 0', () => {
  expect(myCal.mClear()).toBe(0); 
});

// multi calculate
it('multi calculate: 1 + 2 m+ 3 * 4 m- = -9', () => {
  expect(myCal.num(1).add(2).mAdd().num(3).multi(4).mMinus().mResult().result).toEqual(-9);
});

// 






