import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext } from './03_context_themeContext';

//Example: Dynamic Context 動態語境
class ThemeButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button 
        {...props}
        style={{backgroundColor: theme.background, color: theme.foreground}} />
    );
  }
}

function ToggleButton() {
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background,
            color: theme.foreground}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>);
}
// ThemeButton.contextType = ThemeContext;

// export default ThemeButton;
export default ToggleButton;