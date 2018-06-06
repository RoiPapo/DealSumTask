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
        <p className="footer"> * <b>Cumulative Distance</b> represents a sum of the <a className="grayLink" href="https://en.wikipedia.org/wiki/Levenshtein_distance" >Levenshtein distances</a> from all other items in its group.</p>
      </div>
    );
  }
}
export default App;
