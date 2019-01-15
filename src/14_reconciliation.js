import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


const $id = (id) => document.getElementById(id);

//reconcoliation: React 快速更新數值的演算法
//區分的演算法：
// 不同型別的元素

// 同型別的元素

// 子元素遞迴

// keys: 與其兄弟元素比較，其值是唯一即可
// 根據key的比較，React可以快速比較其值的不同，以作必要的更新


// 注意點：
// 因為演算法不會比較不同的組件其值的不同，如果有兩個組件的輸出結果非常類似，那麼可以將它變成同一個型別
// key要使用： 穩定 不易變動 獨一無二 ，如果使用陣列的index值，有可能會出現無法預期的狀況







// export default Hello;
// export { Hello2 };

function quickSortRecu(arr, start, end) {
  let x = arr[start];
  let l = start + 1;
  let r = end - 1;

  while (true) { 
    //right move if the r bigger than start
    while(r > start && arr[r] >= x) {
      --r;
    }
    //left move if the l smaller than start
    while(l <= r && arr[l] <= x) {
      ++l;
    }
    if( l < r ) { //
      [arr[r], arr[l]] = [arr[l], arr[r]];
    } else {
      if(r > start) { //
        [arr[r], arr[start]] = [arr[start], arr[r]];
      }
      break;
    }
  }
  let ls = start, le = r;
  let rs = r + 1, re = end;
  const ll = le - ls, rl = re - rs;
  if(ll > 1) {
    quickSortRecu(arr, ls, le);
  }
  if(rl > 1) {
    quickSortRecu(arr, rs, re);
  }
  return arr;
}

function quickSort(arr) {
  return quickSortRecu(arr, 0, arr.length)
}
quickSort([1, 3, -1 , 1000, -20]);
