
class cal {
  constructor() {
    this.curNum = [];
    this.operator = [];
    this.result = 0; //default result
    this.m = [];
  }
  num(...nums) {
    for(let num of nums) {
      this.curNum.push(num);
    }
    return this;
  }
  arrPushNum(num, opp) {
    this.curNum = [...this.curNum, num];
    this.operator = [...this.operator, opp];
  }
  add(num) {
    this.arrPushNum(num, '+');
    return this;
  }
  minus(num) {
    this.arrPushNum(num, '-');
    return this;
  }
  multi(num) {
    this.arrPushNum(num, '*');
    return this;
  }
  devide(num) {
    this.arrPushNum(num, '/');
    return this;
  }
  equalTo() {
    let opp = this.operator;
    let num = this.curNum;
    let res = num[0]; //result init 
    
    //multiply and devide the numbers first
    for(let i = 0; i < opp.length; i++) {
      if(opp[i] === '*') {
        num[i+1] = num[i] * num[i+1];
        num[i] = '';
        if(i === 0) {
          res = 0;
        }
      } else if(opp[i] === '/') {
        num[i+1] = num[i] / num[i+1];
        num[i] = '';
        if(i === 0) {
          res = 0;
        }
      }
    }
    //sort the number array
    let j = 0;
    let newNum = [];
    if(num.indexOf('') !== -1) { //如果有被乘或除，有空字串之陣列
      while(j < num.length) {
        if(typeof num[j] === 'number') {
          newNum.push(num[j]);
        }
        j++;
      }
    } else {
      newNum = num;
    }
    //only add and minus operator
    let newOpp = [];
    for(let i of opp) {
      if(i === '+' || i === '-') {
        newOpp.push(i);
      } else {
        res = newNum[0]; //如果已經完全沒有+/-
      }
    }
    for(let k = 0; k < newOpp.length; k++) {
      if(newOpp[k] === '+') {
        res += newNum[k + 1];
      } else if(newOpp[k] === '-') {
        res -= newNum[k + 1];
      }
    }
    //reset to default
    this.result = res;
    this.curNum = [];
    this.operator = [];
    return this;
  }
  mAdd() {
    if(this.result === 0 && this.curNum.length > 0) { //如果還沒算出值
      this.equalTo();
    };
    this.m.push(this.result);
    this.result = 0; //reset to zero
    return this;
  }
  mMinus() {
    if(this.result === 0 && this.curNum.length > 0) {
      this.equalTo();
    };
    this.m.push(this.result * -1);
    this.result = 0; //reset to zero
    return this;
  }
  mResult() {
    this.result = this.m.reduce((acc, cur) => acc + cur);
    this.m = []; //reset
    return this;
  }
  mClear() {
    this.curNum = [];
    this.operator = [];
    this.result = 0; //default result
    this.m = [];
    return this.result;
  }
}

module.exports = cal;