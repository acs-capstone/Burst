import React from 'react'
import history from '../history'

const Feedback = props => {
  return (
    <div className="thumbs">
      <h3>Rate Your Experience</h3>

      <button className="thumbs-btn" m onClick={() => history.push('/news')}>
        Thumbs Up
      </button>
      <button className="thumbs-btn ml-4" onClick={() => history.push('/news')}>
        {' '}
        Thumbs Down
      </button>
    </div>
  )
}

export default Feedback
