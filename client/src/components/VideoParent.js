import React, { Component } from 'react'
import { connect } from 'react-redux'
// import ReactDOM from 'react-dom';
import '@opentok/client'
import OpenTok from './OpenTok'
// import './index.css';
// import './polyfills';
import { getSessionThunk } from '../store/session'
import CountdownTimer from './countdown_timer'
import ReactCountdownClock from 'react-countdown-clock'

import {
  // SAMPLE_SERVER_BASE_URL,
  API_KEY,
  SESSION_ID,
  TOKEN
} from '../secrets'

class VideoParent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: this.props.seconds ? this.props.seconds : 60
    }

    this.handleComplete = this.handleComplete.bind(this)
  }

  async componentDidMount(evt) {
    //thunk creator to dispatch and get session id from db
    await this.props.getSessionThunk()
    console.log('currentSession', this.props.session)
    this.setState({ seconds: 5 })
  }

  async handleComplete(evt) {
    console.log('complete')
    await this.setState({
      seconds: this.getNewSeconds(5)
    })
    console.log(this.state.seconds)
  }

  getNewSeconds = sec => {
    if (sec !== this.state.seconds) {
      return sec
    } else {
      return sec + 0.0000001
    }
  }
  render() {
    const sessionId = this.props.session.sessionId
    const token = this.props.session.token

    if (sessionId && token) {
      return (
        <div>
          <OpenTok apiKey={API_KEY} sessionId={sessionId} token={token} />
          <ReactCountdownClock
            seconds={this.state.seconds}
            color="#000"
            alpha={0.9}
            size={100}
            pause={true}
            onComplete={this.handleComplete}
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
