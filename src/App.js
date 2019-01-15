import React, { Suspense, lazy, Component } from 'react';
// import $ from 'jquery';
import logo from './logo.svg';
import Backbone from 'backbone';
import './App.css';
// import { Code } from './02_splitCode';

// 02_React.lazy
import MyErrBoundary from './02_splitCode_errBoundary';
import Context from './03_context';
import { Page, Page2 } from './03_context_page';
import  AppContext  from './03_context_app';
import MyAnotherComponent from './04_errorBoundaries';
import Fragment from './06_fragments';
import Chosen from './08_integratedWithLibraries';
import { List, collection, Example } from './08_integratedWithLibraries';
import MyButton from './09_JSXinDepth';
import { MyComponents1, Story, ButtonApp } from './09_JSXinDepth';
import CounterButton from './10_optimizingPerformance';
import { WordAdder } from './10_optimizingPerformance';
import PortalApp from './11_portals';
import { Parent } from './11_portals';
// import  TickTock  from "./12_reactWithoutES6";
import AutoFocusTextInput from './15_refsAndDOM';
import { CustomTextInput2 } from './15_refsAndDOM';


const OtherComponent = React.lazy(() => import('./02_splitCode'));
const AnotherComponent = React.lazy(() => import('./02_splitCode_another'));
//加上Suspense fallback 來讓載入緩衝時有別的ＵＩ呈現，只要在共同上層中有一個即可
//錯誤範圍的顯示：如果範圍內的模組沒有正確加載，則顯示該錯誤範圍的內容


const USER = {userName: 'userA', permaLink: 'aa.com', userLink: 'bb.com', avatarSize: '870kb', };
const USER2 = {userName: 'user2', permaLink: 'aa.com', userLink: 'bb.com', avatarSize: '80kb', }

const LS1 = [1, 2, 3];
const LS2 = [{id: 1, value: 'a'}, {id: 2, value: 'b'}];
const LS3 = [10, 20, 30];
const model = new Backbone.Model({firstName: 'Freddo'});


class App extends Component {
  render() {
    return (
      <div className="App">
        <MyErrBoundary>
          <Suspense fallback={<div>Loading~~~</div>}>
            <OtherComponent /> 
            <AnotherComponent /> 
          </Suspense>
        </MyErrBoundary>
        <Context />
        <Page user={USER} avatarSize={USER.avatarSize}/>
        <Page2 user={USER2} avatarSize={USER2.avatarSize} />
        <AppContext />
        <MyAnotherComponent />
        <Fragment list={LS1} list2={LS2} />
        <Chosen />
        <List collection={collection} />
        <Example model={model} />
        <MyButton color="red" color2="blue " />
        {LS3.map((num) => (
          <MyComponents1.NumPicker number={num} />
        ))}
        <Story story="this is a story" storyType="photo" />
        <Story story="this is a video" storyType="video" />
        <hr />
        <ButtonApp />
        <CounterButton color="#345" />
        <WordAdder />
        <PortalApp />
        <Parent />
        <AutoFocusTextInput />
        <CustomTextInput2 />
      </div>
    );
  }
}











export default App;
