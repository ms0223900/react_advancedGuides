let opp1 = ['/', '+', '*', '/', '-', '*'];
let num1 = [2, 1, 3, 4, 5, 10, 20];

function oppFilter(opp) {
  let newArr = [];
  let newNum = [];
  let oppPos = {};
  let oppL = opp.length;
  for(let i in opp) {
    if(opp[i] === '*' || opp[i] === '/') {
      oppPos[i] = opp[i];
      newArr.push(parseInt(i));
      newNum.push(num1[parseInt(i)]);
    }
    
  }
  return newArr;
}

let opp2 = ['+', '*', '/', '-', '*'];
let num2 = [1, 2, 3, 4, 5, 6];

function reduceIt(num, opp) {

  let res = 0;
  for(let i = 0; i < opp.length; i++) {
    if(opp[i] === '*') {
      num[i+1] = num[i] * num[i+1];
      num[i] = '';
    } else if(opp[i] === '/') {
      num[i+1] = num[i] / num[i+1];
      num[i] = '';
    }
  }
  
  let j = 0;
  let newNum = [];
  while(j < num.length) {
    if(typeof num[j] === 'number') {
      newNum.push(num[j]);
    }
    j++;
  }
  let newOpp = [];
  for(let i of opp) {
    if(i === '+' || i === '-') {
      newOpp.push(i);
    }
  }

  // return newOpp;
  for(let k = 0; k < newOpp.length; k++) {
    res = newNum[0]; //initial number
    if(newOpp[k] === '+') {
      res += newNum[k + 1];
    } else if(newOpp[k] === '-') {
      res -= newNum[k + 1];
    }
  }
  return res;
}


module.exports = reduceIt(num2, opp2);
// let res = 1+3*4/5-10;