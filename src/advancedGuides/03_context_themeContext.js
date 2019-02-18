import React from 'react';
import ReactDOM from 'react-dom';


//Example: Dynamic Context 動態語境
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

//變成物件形式輸出
export const ThemeContext = React.createContext({
  theme: themes.dark, // default value
  toggleTheme: () => {} //default function
});
  
