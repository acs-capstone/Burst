import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import Burst_logo from '../Burst_logo.png'

const Navbar = ({ handleClick, isLoggedIn, sources }) => (
  <nav className="navbar navbar-expand-lg fixed-top">
    <div className="container">
      {isLoggedIn && sources && sources.length ? (
        < div >
          {/* The navbar will show these links if you're logged in and have completed the quiz */}
          <nav className="navbar">
            <Link className="navbar-brand" to="/home">
              <img src={Burst_logo} id="nav-logo" alt="Burst" />
            </Link>

            <Link className="nav-link" to="/home">
              Home
              </Link>

            <Link className="nav-link" to="/news">
              Browse
              </Link>

            <Link className="nav-link" to="/popular">
              Discuss
              </Link>

            <Link className="nav-link" to="/explore">
              Visualize
              </Link>

            <Link className="nav-link" to="/about">
              About
              </Link>

            <a className="nav-item">
              <a className="nav-link" href="/" onClick={handleClick}>
                Logout
              </a>
            </a>

          </nav>
        </div>
      ) : !isLoggedIn ? (
        <div>
          {/* The navbar will show these links before you've logged in */}
          <nav className="navbar">
            <img src={Burst_logo} id="nav-logo" alt="Burst" />

            <Link className="nav-link" to="/about">
              About
            </Link>

            <Link className="nav-link" to="/login">
              Login
            </Link>

            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </nav>
        </div>
      ) : (
            < div >
              {/* The navbar will show these links if you're logged in and have not completed the quiz */}
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
