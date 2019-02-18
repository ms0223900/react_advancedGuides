// function plus(...args) {
//   let total = 0;
//   for(let arg of args) {
//     total += arg;
//   }
//   return total;
// }

class cal {
  constructor(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
    this.result = 0; //default result
    this.m = [];
  }

  add() {
    this.result = this.num1 + this.num2;
    return this.result;
  }
  minus() {
    this.result = this.num1 - this.num2;
    return this.result;
  }
  mAdd() {
    this.add();
    this.m.push(this.result);
    return this.m;
  }
  mMinus() {
    this.minus();
    this.m.push(this.result * -1);
    return this.m;
  }
  mResult() {
    this.result = this.m.reduce((acc, cur) => acc + cur);
    return this.result;
  }
  mClear() {
    this.m = [];
    this.result = 0;
    return this.result;
  }
}

module.exports = cal;