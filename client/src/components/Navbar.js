import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ id, handleClick, isLoggedIn, user }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div className="container ">
      {isLoggedIn && user.sources.length ? (
        < div >
          < ul className="navbar-nav ml-auto">
            <Link className="navbar-brand" to="/news">Burst</Link>
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/news">News Feed</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleClick}>
                Logout
            </a>
            </li>
          </ul>
        </div>
      ) : isLoggedIn && !user.sources.length ? (
        < div >
          < ul className="navbar-nav ml-auto">
            <a className="navbar-brand">Burst</a>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleClick}>
                Logout
          </a>
            </li>
          </ul>
        </div>
      ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <ul className="navbar-nav ml-auto">
                <a className="navbar-brand">Burst</a>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                </Link>
                </li>
              </ul>
            </div>
          )}
    </div >
  </nav >
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    id: state.user.id,
    user: state.user
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
