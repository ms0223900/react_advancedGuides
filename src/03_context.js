import React from 'react';
import ReactDOM from 'react-dom';


//使用context來將會被子層大量使用的值分離出來，但這相對會讓各元素元件的重複利用更加困難
//創建一個主題的內容，預設值為light
const ThemeContext = React.createContext('light');

function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}
class ThemeButton extends React.Component {
  //安排一個contextType給此class讀取目前的主題內容，React會找到最相近的Theme provider並使用該值
  static contextType = ThemeContext;
  render() {
    return <button theme={this.context}> button </button>
  }
}
class Context extends React.Component {
  render() {
    return (
      <div>
        <hr />
        <h3>03_Context</h3>
        <ThemeContext.Provider value="dark" >
          <Toolbar />
        </ThemeContext.Provider>
      </div>
    );
  }
}

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
  return (<a>Link</a>);
}
function Avatar(props) {
  return (<div>Avatar!!</div>);
}
function PageLayout(props) {
  return (
    <div userLink={props.userLink}>
    </div>);
}
//改善方法一：在上層就定義某個子層特別需要的值

function Page(props) {
  const user = props.uer;
  const userLink = (
    <Link href={user.permaLink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />
}

//改善方法二：









export default Context;
export { Context };
export { Page };