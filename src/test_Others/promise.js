//
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


///---------------------------------------------------------------------------------------------------------

const data1 = {
  id: 1, 
  name: 'Peter',
  date: (new Date()).toLocaleDateString(),
};
const data2 = {
  id: 2, 
  name: 'Sam',
  date: (new Date()).toLocaleDateString(),
};
var db;
let request = window.indexedDB.open('myDB1');
function dataBaseInit(tableName) {
  request.addEventListener('success', function() {
    db = request.result;
    console.log('database open success');
    addRequest();
    // readRequest();
    // doRequest.read();
  });
  request.addEventListener('upgradeneeded', function(e) {
    db = e.target.result;
    let objectStore;
    if(!db.objectStoreNames.contains(tableName)) {
      objectStore = db.createObjectStore(tableName, { 
        keyPath: 'id',
        autoIncrement: true,  
      });
    };
    objectStore.createIndex('name', 'name', { unique: false, });
    console.log('create success');
  });
  
}
// dataBaseInit('Member');

function add(db, data) {
  let request = db.transaction(['Member'], 'readwrite')
    .objectStore('Member')
    .add(data);
  
  request.addEventListener('success', (e) => {
    console.log("write success !");
  });

  request.addEventListener('error', (e) => {
    console.log('write failed! ');
  });
}
function addRequest() {
  // doRequest.add(i);
}

const doRequest = {
  add() {
    return null;
  },
  read() {
    return null;
  },
}

request.addEventListener('success', addMyRequest(data1, data2));
function addMyRequest(...data) {
  let db;
  let requestRead
  let request = window.indexedDB.open('myDB1');
  request.onsuccess = function(e) {
    db = e.target.result;
    requestRead = (id) => db.transaction(['Member']).objectStore('Member').get(id);
  }
  setTimeout(() => {
    setTimeout(() => {
      console.log(db);
      for (let i = 0; i < data.length; i++) {
        const el = data[i];
        console.log(el.id);
        if(!requestRead(el.id).result || typeof(el.id) === 'number') {
          console.log('add it');
          add(db, el);
        }
      }
    }, 0);
  }, 0);
}
//真正要添加數據時
doRequest.add = addMyRequest;
//手動添加
// doRequest.add();


function readRequest(id) {
  read(id);
}
function read(db, id) {
  let request = db.transaction(['Member']).objectStore('Member').get(id);

  request.onerror = function(e) {
    console.log('read failed, need to add');
    
  }
  request.onsuccess = function(e) {
    console.log(request.result);
    if(request.result) {
      let rs = request.result;
      console.log('Name: ' + rs.name);
      return false;
    } else {
      console.log('add');
      return true; //read false, need to add new one
    }
  }
}

// add();