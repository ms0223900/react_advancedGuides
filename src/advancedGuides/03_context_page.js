import React from 'react';
import ReactDOM from 'react-dom';


//使用context來將會被子層大量使用的值分離出來，但這相對會讓各元素元件的重複利用更加困難
//創建一個主題的內容，預設值為light

//巢狀傳值
//以往的不良寫法，如果只有在很子層才需要某個值，用以下寫法層層傳遞會非常不好讀，且不容易維護：
let badWriting = () => {
  return 
    // <React.Fragment>
    //   <Page user={user} avatarSize={avatarSize} />
    //   // ... which renders ...
    //   <PageLayout user={user} avatarSize={avatarSize} />
    //   // ... which renders ...
    //   <NavigationBar user={user} avatarSize={avatarSize} />
    //   // ... which renders ...
    //   <Link href={user.permalink}>
    //     <Avatar user={user} size={avatarSize} />
    //   </Link>
    // </React.Fragment>
  
}

function Link(props) {
  return (<a href={props.href}>{props.children}</a>);
}
function Avatar(props) {
  return (<div>{props.user.userName} / fileSize: {props.size}</div>);
}
function PageLayout(props) {
  return (
    <div>
      <hr />
      <p>{props.title}</p>
      {props.userLink}
      {props.topBar}
    </div>);
}
//改善方法一：在上層就定義某個子層特別需要的值

function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permaLink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />
}

//改善方法二：在上層元件上挖洞
function Page2(props) {
  const user = props.user;
  const topBar = (
      <Link href={user.permaLink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
  );
  return (
    <PageLayout 
      className="Page2"
      title={props.title}
      topBar={topBar}
      />
  );
}

// context API------------------------------
// React.createContext()------
let myValue = { };
const MyContext = React.createContext(myValue);

// Context.Provider : 用這個來取得context值------
// <MyContext.Provider />

//Class.contextType = ... 指定某個class的context為何------
class MyClass extends React.Component {
}
MyClass.contextType = MyContext;

//Context.Consumer: 讓context與function component做連結------
//<MyContext.Consumer>
 // {value => ...}
//</MyContext.Consumer>





export default Page;
export { Page, Page2 };