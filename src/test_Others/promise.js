//
const $id = (id) => document.getElementById(id);
const $ = (all) => document.querySelectorAll(all);
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
///---------------------------------------------------------------------------------------------------------




var db;
let request = window.indexedDB.open('myDB1');

function dataBaseInit(tableName) {
  request.addEventListener('success', function() {
    db = request.result;
    console.log('database: ' + tableName +', open success.');
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
dataBaseInit('Member');
dataBaseInit('Todos');  

//---------------------------------------------------------------------------------------


function add(db, table,  dataArr) {
  console.log('adding start!');
  //取得第0個
  let DATA = dataArr;
  if(DATA) {
    for (let i = 0; i < DATA.length; i++) {
      console.log(DATA[i]);
      let request = db.transaction([table], 'readwrite')
        .objectStore(table)
        .add(DATA[i]);
      console.log(request);
      request.addEventListener('success', (e) => {
        console.log("write success !");
      });
      request.addEventListener('error', (e) => {
        console.log('already have the data.');
        // document.writeln('');
      });
      if(i === DATA.length - 1) {
        return [db, table];
        // break;
      }
    }
  } else {
    return [db, table];
  }
  
}
function getDB_All(db, table) {
  return new Promise((res, rej) => {
    let objectStore = db.transaction([table]).objectStore(table).getAll();
    console.log(objectStore);
    objectStore.onsuccess = function () {
      res(objectStore.result);
    }
  });
}
// request.addEventListener('success', addMyRequest(1, data2));  
function addMyRequest(table, mountEl, dataArr = []) {
  let db;
  let dbPromise;

  let request = window.indexedDB.open('myDB1');
  request.onsuccess = function(e) {
    console.log('openSuccess!');
    dbPromise = new Promise((res, rej) => {
      db = e.target.result; //這裡要用異步處理！！
      console.log(dataArr); //dataArr pass OK
      if(dataArr.length > 0) {
        res([db, table, dataArr]); // write
      } else { 
        res([db, table]); // read
      }
    });
    if(dataArr.length > 0) { // write and mount
      dbPromise
      .then(val => add(val[0], val[1], val[2]))
      .then(val => getDB_All(val[0], val[1]))
      .then(val => mountEl(val));
    } else { // read and mount
      dbPromise
      .then(val => getDB_All(val[0], val[1]))
      .then(val => mountEl(val));
    }
    
  }
}
function mountDataTable(el) {
  let dataElements = '';
  if(el.length > 1) {
    for (let i = 0; i < el.length; i++) {
      dataElements += 
      `<tr>
        <td>${ el[i].id }</td>
        <td>${ el[i].name }</td>
        <td>${ el[i].date }</td>
      </tr>`;
    }
  } else {
    dataElements = `<tr></tr>`;
  }
  // console.log(el, dataElements);
  let dataTable = 
   `<table>
      <tbody>
        <tr>
          <th>ID: </th>
          <th>Name: </th>
          <th>Add Date: </th>
        </tr>
        ${dataElements}
      </tbody>
    </table>`;
  $id('root').innerHTML = '';
  $id('root').innerHTML += dataTable;
}

const data = {
  todos: [{
    id: 1,
    todoThing: 'aaaa',
    isComplete: false, 
  }]
};
function toggleTodo(e) {
  const todoID = parseInt(e.target.getAttribute('todoID'));
  let todos = data.todos;
  todos.map(todo => 
    todo.id === todoID ? 
    { ...todo, isComplete: !todo.isComplete} : 
    todo
  );

}
function deleteTodo(e) {
  const todoID = parseInt(e.target.getAttribute('todoID'));
  let todos = data.todos;
  let newTodos = [];
  todos.forEach(todo => {
    if(todo.id !== todoID) {
      newTodos = [...newTodos, todo];
    }
  });
  console.log(newTodos);
}
function addTodos(e) {
  if($id('inputTodo').value === '') {
    alert('Please todo something!');
    return;
  }
  let todos = data.todos;
  let newTodo = {
    id: typeof(todos[todos.length - 1]) !== 'undefined' ? 
    (todos[todos.length - 1].id) + 1 : 
    1,
    todoThing: $id('inputTodo').value,
    isComplete: false,
  }
  data.todos = [...todos, newTodo];
  $id('inputTodo').value = '';
  // 更新資料庫
  //rerender
  addMyRequest('Todos', mountTodos, data.todos);
}
function mountTodos(todosArr) {
  console.log(todosArr);
  data.todos = todosArr; //update inner data!
  let todos = '';
  for (let i = 0; i < todosArr.length; i++) {
    const todo = todosArr[i];
    todos +=  
      `<p>
        <span>${todo.id} </span>
        ${todo.todoThing} 
        <span class='deleteBTN' todoID=${todo.id}> | X | </span>
      </p>`;
  }
  $id('todo-container').innerHTML = '';
  $id('todo-container').innerHTML += todos;
  for (const el of $('.deleteBTN')) {
    el.onclick = deleteTodo;
  }
  // add event listener to the all todos
}



$id('BTN1').addEventListener('click', function() {
  // document.writeln(addMyRequest());
});

$id('BTN2').addEventListener('click', function() {
  addMyRequest('Member', mountDataTable, [data1, data2]);
});

window.addEventListener('load', function () {
  // Member Table
  addMyRequest('Member', mountDataTable);
  // Todos
  addMyRequest('Todos', mountTodos);
  $id('todoConfirm').onclick = function(e) {
    //直接更新畫面，再存入資料庫
    addTodos();
  }
  $id('inputTodo').onkeyup = function (e) {
    if(e.keyCode === 13 || e.keyCode === 27) {
      addTodos();
    }
  }
});


//---------------------------------------------------------------------------------------


// function updateRequests() {
//   console.log(db);
//   for (let i = 0; i < data.length; i++) {
//     const el = data[i];
//     console.log(el.id);
//     if(typeof(el.id) === 'number') {
//       console.log('add it');
//       add(db, el);
//     }
//   }
// }


// add();

// return objectStore;
  // objectStore.openCursor().onsuccess = function(e) {
  //   let cursor = e.target.result;
  //   if(cursor) {
  //     let obj = {
  //       id: cursor.key,
  //       name: cursor.value.name,
  //       date: cursor.value.date,
  //     }
  //     dbObjects = [...dbObjects, obj];
  //     cursor.continue();
  //   } else {
  //     console.log('read complete');
  //     // console.log(dbObjects);
  //     return dbObjects;
  //   }
  // };
  // function read(db) {
  //   console.log('reading start!');
  //   let request = db.transaction(['Member']).objectStore('Member').get(1); //temp id: 1
  
  //   request.onerror = function(e) {
  //     console.log('read failed, need to add');
      
  //   }
  //   request.onsuccess = function(e) {
  //     console.log(request.result);
  //     if(request.result) {
  //       let rs = request.result;
  //     } else {
  //       console.log('add');
  //     }
  //   }
  //   return db;
  // }