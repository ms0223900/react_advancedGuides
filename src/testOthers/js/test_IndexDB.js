//indexDB
let request = window.indexedDB.open('myDB1');
const data1 = {
  id: 1,
  name: 'Peter',
  date: new Date(),
};
const data2 = {
  id: 2,
  name: 'Bryan',
  date: new Date(),
};
const data3 = {
  id: 3,
  name: 'Bryan',
  date: new Date(),
};
var db; //global db
request.onsuccess = function(e) {
  db = request.result;
  document.writeln('database opened successful');
  console.log(db);
  update.setAdd(add); 
  // update.add();
  console.log(update);
  console.log('add');
};






const update = {
  updateData: {},
  add: null,
  setAdd(add) {
    this.add = add(this.updateData);
  },
}

function runSomething() {
  console.log('run!');
  return {
    id: 4,
    name: 'aaa',
    date: new Date(),
  }
}
//寫入資料庫

update.updateData = runSomething(); //從後面產生之資料
//這個會先跑完，導致存不進資料


// 打開資料庫成功

let p1;


//promise a request.result



// 打開失敗
request.onerror = function(e) {
  db = request.result;
  document.writeln('database has something wrong!');
}
// 新建資料庫
request.onupgradeneeded = function(e) {
  db = e.target.result;
  if(!db.objectStoreNames.contains('Person')) {
    let objectStore = db.createObjectStore('Person', { keyPath: 'id', });
    objectStore.createIndex('name', 'name', { unique: false, });
    objectStore.createIndex('date', 'date', { unique: true, });
  }
}
// 新增資料到資料庫
function add(data) {
  console.log(data);
  let request = db.transaction(['Person'], 'readwrite')
    .objectStore('Person')
    .add(data);
  
  request.onsuccess = function(e) {
    console.log('write success');
  }
  request.onerror = function(e) {
    console.log(e + 'write wrong');
  }
};
function a() {
  console.log('aFunction');
  alert('kkk');
}
function b() {
  alert('bbb');
}

// p1.then(add(db));
// p1.then(add()).then(b());

// setTimeout(() => {
//   add(data1);  
// }, 100);

function asyncFunction(val) {
  return new Promise((res, rej) => {
    res(val);
    rej(val);
  })
}