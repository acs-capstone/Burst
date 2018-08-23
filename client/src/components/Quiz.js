import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Questions from './questions'
import Sources from './Sources'
import Topics from './topics'

const Quiz = props => {
  const user = props.user

  if (!user) return <div>hello, world!</div>

  if (!user.poliOriId) {
    return <Questions />
  } else if (!user.topics.length) {
    return <Topics />
  } else if (!user.sources.length) {
    return <Sources />
  } else {
    return <Redirect to="/home" />
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(Quiz)
