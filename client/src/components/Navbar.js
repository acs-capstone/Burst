import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import Burst_logo from '../Burst_logo.png'
import Burst_title from '../Burst_title.png'


const Navbar = ({ id, handleClick, isLoggedIn, sources }) => (
  <nav className="navbar navbar-expand-lg fixed-top">

    <div className="container ">
      {isLoggedIn && sources && sources.length ? (

        <div>
          <nav className="navbar">

            <Link className="navbar-brand" to="/home">
              <img src={Burst_logo} id="nav-logo" alt="Burst" />
            </Link>

            <a className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </a>

            <a className="nav-item">
              <Link className="nav-link" to="/news">
                Browse
              </Link>
            </a>

            <a className="nav-item">
              <Link className="nav-link" to="/popular">
                Discuss
              </Link>
            </a>

            <a className="nav-item">
              <Link className="nav-link" to="/explore">
                Visualize
              </Link>
            </a>

            <a className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </a>

            <a className="nav-item">
              <a className="nav-link" href="/" onClick={handleClick}>
                Logout
              </a>
            </a>

          </nav>
        </div>
      ) : !isLoggedIn ? (
        <div>
          {/* The navbar will show these links before you log in */}
          <nav className="navbar">
            <img src={Burst_logo} id="nav-logo" alt="Burst" />
            <a className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </a>
            <a className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </a>
            <a className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </a>
          </nav>
        </div>
      ) : (
            <div>
              <nav className="navbar">
                <img src={Burst_logo} id="nav-logo" alt="Burst" />
                <a className="nav-item">
                  <a className="nav-link" href="/" onClick={handleClick}>
                    Logout
              </a>
                </a>
              </nav>
            </div>
          )}
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    id: state.user.id,
    sources: state.user.sources
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)
