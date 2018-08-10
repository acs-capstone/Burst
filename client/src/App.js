import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Burst!</h1>
        </header>

        <Routes />
        <footer className="py-5 bg-light">
          <div className="container">
            <p className="m-0 text-center">&copy; 2018 ACS Burst!</p>
          </div>
        </footer>
      </div>
    )
  }
}

export default App
