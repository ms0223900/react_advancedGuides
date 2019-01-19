const p1 = new Promise((resolve, reject) => {
  resolve(4)
})

p1.then((val) => a(val))
  .then((val) => {
      console.log(val) //6
      throw new Error('error!')
  })
  .catch((err) => {      //catch無法抓到上個promise的回傳值
      console.log(err.message)
      //這裡如果有回傳值，下一個then可以抓得到
      //return 100
  })
  .then((val) => console.log(val, 'done'));

function a(val) {
  console.log(val) //4
  return val + 2
}


//---------------------------------------------------------------------------------------
function asyncFunction(val) {
  return new Promise((res, rej) => {
    if(val)
      res(val)
    else
      rej('reason');
  })
}


function a(val) {
  setTimeout(() => {
    console.log('fnA: ' + val);
    
  }, 0);
  return val + 1;
}
function b(val) {
  let k = 0;
  for (let i = 0; i < 100000000; i++) {
    k++;
  }
  // return k + 10; 
  setTimeout(() => {
    console.log('fnB: ' + k); 
  }, 0);
}
function c(val) {
  setTimeout(() => {
    console.log('fnC: ' + val); 
    return val + 10; 
  }, 2000);
}
let d = (val) => setTimeout((val=1000) => {
  console.log('fnD: ' + 1000);
  return val + 1000;
}, 3000);
// a(100);
// b(100);
// c(100);
// d(1000);
// asyncFunction(1).then(d).then(a).then(b).then(c);

const timer = (i) => {
  console.log('timer');
  setTimeout(() => {
    console.log('time: ' + i);
    ++i;
    if(i < 10) {
      timer(i);
    }
  }, 1000);
};

let delay = (s) => {
  // let res = res;
  return new Promise((res, rej) => {
    setTimeout(res, s);
    // rej();
  });
};
console.log(delay(1000));
function ikk(i) {
  // let kk = i;
  return function k(t) {
    return i + t;
  }
}

async function test01() {
  await timer(1);
  await b(1);
  await a(2);
}
// test01();




return new Promise((res, rej) => {
  res(db);
})