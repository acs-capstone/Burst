import React, { Component } from 'react'
import { connect } from 'react-redux'
import '@opentok/client'
import OpenTok from './OpenTok'
import { getSessionThunk } from '../store/session'

import { API_KEY } from '../secrets'

class VideoParent extends Component {
  async componentDidMount(evt) {
    //thunk creator to dispatch and get session id from db
    await this.props.getSessionThunk()
  }

  render() {
    const sessionId = this.props.session.sessionId
    const token = this.props.session.token

    if (sessionId && token) {
      return (
        <div>
          <OpenTok
            apiKey={API_KEY}
            sessionId={sessionId}
            token={token}
            user={this.props.session.user}
          />
        </div>
      )
    } else {
      return <h3>Loading...</h3>
    }
  }
}

const mapState = state => ({
  session: state.session
})

const mapDispatch = dispatch => {
  return {
    getSessionThunk: () => dispatch(getSessionThunk())
  }
}

export default connect(
  mapState,
  mapDispatch
)(VideoParent)
