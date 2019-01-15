import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

//JSX
//*組件開頭一定要大寫
function MyButton(props) {
  return (
    <React.Fragment> 
      <button style={{backgroundColor: props.color}}>Click Me</button>
      {React.createElement(
        'button',
        {style: {backgroundColor: props.color2}},
        'Click Me Too!'
      )}
    </React.Fragment>);
}

//可以使用物件的dot來取得子項目

const MyComponents1 = {
  NumPicker(props) {
    function handleAlert(e) {
      alert(e.target.getAttribute('num'));
    }
    return ( 
      <div 
        num={props.number} 
        onClick={handleAlert}
        className={`numKey numKey${props.number}`}> 
        Pick a number: {props.number} 
      </div> 
      );
  },
  WordPicker(props) {
    return <div> Pick a word: {props.word} .</div>
  }
}
// (function a() {
//   return 
// })();



//JSX type(第一個參數那個): 不能是表達式
function PhotoStory(props) {
  return <div>PhotoStory: {props.story}<img src="" alt={props.story}/></div>
}
function VideoStory(props) {
  return <div>VideoStory: {props.story}這是影片</div>
}
const componentType = {
  photo: PhotoStory,
  video: VideoStory,
}

function Story(props) {
  const SpecificStory = componentType[props.storyType];
  //wrong 
  // return <componentType[props.storyType] story={props.story} />;
  //correct
  return <SpecificStory story={props.story} />
}

//使用擴展符號
const Button2 = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryBTN" : "SecondBTN";
  return <button className={className} {...other} />;
}
const ButtonApp = () => {
  return (
    <div>
      <Button2 kind="primary" onClick={() => console.log("clicked!")}>
        Button2!
      </Button2>
    </div>
  );
}


//boolean(true, false)ß, null, undefined 都會被忽略成空值
//要呈現則需使用String()等等的方法



export default MyButton;
export { MyComponents1, Story, ButtonApp };


