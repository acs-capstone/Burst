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
      </h3>
      <div>
        <div>
          <h5>Update Preferences</h5>
          <h4>{`Your Political Orientation Score is ${
            user.poliOri.poliOri
            }`}</h4>
          <Link to="/questions">Retake Quiz</Link>
        </div>
        <div>
          <h4>Your Current Topics Are: </h4>
          {user.topics.map(topic => {
            return <li key={topic.id}>{topic.name}</li>
          })}
          <Link to="/topics">Update Topics</Link>
        </div>
        <div>
          <h4>Your Current Sources Are:</h4>
          {user.sources.map(source => {
            return <li key={source.id}>{source.name}</li>
          })}
          <Link to="/sources">Update Sources</Link>
        </div>
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
