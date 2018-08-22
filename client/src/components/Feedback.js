import React from 'react'
import history from '../history'

const Feedback = props => {
  return (
    <div>
      <h3>Rate Your Experience</h3>
      <button onClick={() => history.push('/news')}>Thumbs Down</button>
      <button onClick={() => history.push('/news')}> Thumbs Up</button>
    </div>
  )
}

export default Feedback
