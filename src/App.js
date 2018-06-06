import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import logo from './Assets/Logo.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} alt="logo" />
        </header>

        <Menu/>
        
      </div>
    );
  }
}
export default App;
