import React, { Component } from 'react'
import './App.css'
import { Navbar } from './components'

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="content-div main-container position-relative">
          <Routes />
        </div>
        <footer className="footer">
          <p className="text-center">&copy; 2018 ACS Burst!</p>
        </footer>
      </div>
    )
  }
}

export default App
