import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import {
  Login,
  Signup,
  UserHome,
  AllArticles,
  Sources,
  Questions,
  Topics,
  Quiz,
  PopularArticles,
  VideoParent,
  About
} from './components'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/about" component={About} />
        <Route exact path="/videochat" component={VideoParent} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {<Route exact path="/quiz" component={Quiz} />}
            <Route exact path="/sources" component={Sources} />
            <Route path="/questions" component={Questions} />
            <Route path="/home" component={UserHome} />
            <Route path="/news" component={AllArticles} />
            <Route path="/topics" component={Topics} />
            <Route exact path="/videochat" component={VideoParent} />
            <Route path="/popular" component={PopularArticles} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
        {/* should we also have a fallback when you're logged in? */}
        <Route component={Quiz} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)

/**
 * PROP TYPES
 */
