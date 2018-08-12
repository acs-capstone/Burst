import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ id, handleClick, isLoggedIn }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div className="container ">
      <a className="navbar-brand">Burst</a>
      {isLoggedIn ? (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {/* The navbar will show these links after you log in */}
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/" onClick={handleClick}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-auto">
          {/* The navbar will show these links before you log in */}

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
    id: state.user.id
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
