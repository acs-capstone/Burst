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
    <div className="container form-group">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"> Email</label>
          <input className="form-control" name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"> Password </label>
          <input className="form-control" name="password" type="text" />
        </div>
        <div>
          <button type="submit" id="login-button">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
      {displayName === 'Login' ? (
        <div>
          New to Burst?
          <Link to="/signup"> Sign Up</Link>
        </div>
      ) : (
          <div>
            Already have an account?
          <Link to="/login"> Login</Link>
          </div>
        )}
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
