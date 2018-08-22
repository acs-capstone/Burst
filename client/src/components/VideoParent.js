import React, { Component } from 'react'
import { connect } from 'react-redux'
import '@opentok/client'
import OpenTok from './OpenTok'
import { getVideoSessionThunk } from '../store/videoSession'
// const apiKey = process.env.VIDEO_API_KEY
// const VIDEO_API_KEY = process.env.VIDEO_API_KEY
import { VIDEO_API_KEY } from '../secrets'
class VideoParent extends Component {
  async componentDidMount(evt) {
    //thunk creator to dispatch and get session id from db
    // console.log('IN COMPONENT DID MOUNT')
    // console.log('**VIDEO API KEY', VIDEO_API_KEY)
    await this.props.getVideoSessionThunk(this.props.match.params.id)
  }

  render() {
    if (this.props.videoSession && this.props.videoSession.sessionId) {
      const sessionId = this.props.videoSession.sessionId
      const token = this.props.videoSession.token
      const user = this.props.videoSession.user
      // console.log('apiKEYYY', apiKey)

      return (
        <div>
          <OpenTok
            apiKey={VIDEO_API_KEY}
            sessionId={sessionId}
            token={token}
            user={user}
          />
        </div>
      )
    } else {
      return <h3>Loading...</h3>
    }
  }
}

const mapState = state => ({
  videoSession: state.videoSession
})

const mapDispatch = dispatch => {
  return {
    getVideoSessionThunk: id => dispatch(getVideoSessionThunk(id))
  }
}

export default connect(
  mapState,
  mapDispatch
)(VideoParent)
