import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div className="container form-group" id="login-form">
      <form className="login-form" onSubmit={handleSubmit} name={name}>
        <div className="form-group">
          <label htmlFor="email" className="auth-label"> Email</label>
          <input
            className="form-control"
            name="email"
            type="text"
            id="login-email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="auth-label"> Password </label>
          <input
            className="form-control"
            name="password"
            type="password"
            id="login-input"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" id="login-button">
            {displayName}
          </button>
        </div>
        {error && error.response && <div id="login-error"> {error.response.data} </div>}
        {/* <a href="/auth/google">{displayName} with Google</a> */}
        {displayName === 'Login' ? (
          <div className="auth-label">
            New to Burst?
          <Link to="/signup"> Sign Up</Link>
          </div>
        ) : (
            <div className="auth-label">
              Already have an account?
          <Link to="/login"> Login</Link>
            </div>
          )}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm)
export const Signup = connect(
  mapSignup,
  mapDispatch
)(AuthForm)
