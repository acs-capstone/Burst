import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

/* COMPONENT */

export const UserHome = props => {
  const { user } = props
  return (
    <div>
      <h3>
        Welcome, {user.email}
        !!!!!!
      </h3>
      <div>
        <h4>{`Your Political Orientation Score is ${user.poliOriId}`}</h4>
        <h5>Update Preferences</h5>
        <Link to="/questions">Quiz</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/sources">Sources</Link>
      </div>
    </div>
  )
}

/* CONTAINER */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)
