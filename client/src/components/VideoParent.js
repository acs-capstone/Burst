import React, { Component } from 'react'
import { connect } from 'react-redux'
import '@opentok/client'
import OpenTok from './OpenTok'
import { getSessionThunk } from '../store/session'
import CountdownTimer from './countdown_timer'
import ReactCountdownClock from 'react-countdown-clock'

import {
  // SAMPLE_SERVER_BASE_URL,
  API_KEY
  // SESSION_ID,
  // TOKEN
} from '../secrets'

class VideoParent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: this.props.seconds ? this.props.seconds : 5,
      subscriber: false,
      audioOn: false
    }

    this.handleComplete = this.handleComplete.bind(this)
    this.handleSubscribe = this.handleSubscribe.bind(this)
  }

  async componentDidMount(evt) {
    //thunk creator to dispatch and get session id from db
    await this.props.getSessionThunk()
    console.log('session info', this.props.session)
    //sessionId
    //token
    //user: first or user: second
    console.log('currentSession', this.props.session)
    if (this.props.session.user === 'first') {
      console.log('sessionaslfjadsl', this.props.session.user)
      console.log('audioonstae', this.state.audioOn)
      await this.setState({ audioOn: true })
      console.log('audio ONNNN', this.state.audioOn)
    }
    this.setState({ seconds: 5 })
  }

  async handleComplete(evt) {
    console.log('complete')
    await this.setState({
      seconds: this.getNewSeconds(5),
      audioOn: !this.state.audioOn
    })
    console.log(this.state.seconds)
    console.log('audio on state after time_________', this.state.audioOn)
  }

  // async toggleAudio() {
  //   await this.setState({ audioOn: false })
  //   console.log('audio off!!!')
  // }

  getNewSeconds = sec => {
    if (sec !== this.state.seconds) {
      return sec
    } else {
      return sec + 0.0000001
    }
  }

  async handleSubscribe(evt) {
    await this.setState({ subscriber: true })
    //set audio here based on first or second user?
    console.log('subscriber is here!')
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
            handleSubscribe={this.handleSubscribe}
            user={this.props.session.user}
            audio={this.state.audioOn}
          />
          {this.state.subscriber ? (
            <ReactCountdownClock
              seconds={this.state.seconds}
              color="#000"
              alpha={0.9}
              size={100}
              pause={true}
              onComplete={this.handleComplete}
            />
          ) : (
            <h4>Waiting for your fellow Burster!</h4>
          )}
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
