import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../store'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div id="login-form">
      <Grid item xs={6}>
        <Card>
          <div className="container form-group">
            <form onSubmit={handleSubmit} name={name}>
              <div>
                <label htmlFor="email" />
                <input
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="password" />
                <input
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  type="password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="login-btn"
                >
                  {displayName}
                </button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
            <a id="google" href="/auth/google">
              {displayName} with Google
            </a>
          </div>
        </Card>
      </Grid>
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
