import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext, themes } from './03_context_themeContext';
import  ToggleButton  from './03_context_themeButton';

//Example: Dynamic Context 動態語境
// Example 1----------------
// function ToolBar(props) {
//   return (
//     <ThemeButton onClick={props.changeTheme}>
//       Change Theme
//       <span>1</span>
//     </ThemeButton>
//   );
// }


// class AppContext extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       theme: themes.light,
//     }
//   }

//   onChangeTheme = () => {
//     this.setState(state => ({
//       theme: 
//         state.theme === themes.dark
//           ? themes.light 
//           : themes.dark,
//     }))
//   }
//   render() {
//     return(
//       <div>
//         <ThemeContext.Provider value={this.state.theme}>
//           <ToolBar changeTheme={this.onChangeTheme}/>
//         </ThemeContext.Provider>
//         <section>
//           <ThemeButton />
//         </section>
//       </div>
//     );
//   }
// }
//Example 2
class AppContext extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark
          ? themes.light
          :themes.dark,
      }));
    }
    this.state = {
      theme: themes.dark,
      toggleTheme: this.toggleTheme,
    }
  }

  render() {
    return (
      // The entire state is passed to the provider
      <ThemeContext.Provider value={this.state}>
        <ToggleButton />
      </ThemeContext.Provider>
    );
  }

}


export default AppContext;