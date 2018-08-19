import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import { Navbar } from './components'

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="content-div" className="main-container position-relative">
          <Routes />
        </div>
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
