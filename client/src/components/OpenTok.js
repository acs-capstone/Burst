import React from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'
import ReactCountdownClock from 'react-countdown-clock'
import { deleteVideoSessionThunk } from '../store/videoSession'
import { connect } from 'react-redux'
import history from '../history'
import { Link } from 'react-router-dom'

class OpenTok extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
      publishAudio: false,
      seconds: this.props.seconds ? this.props.seconds : 5,
      subscriber: false,
      count: 0
    }

    this.handleComplete = this.handleComplete.bind(this)
    this.handleSubscribe = this.handleSubscribe.bind(this)
    this.getNewSeconds = this.getNewSeconds.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.sessionEventHandlers = {
      sessionConnected: async () => {
        await this.setState({ connection: 'Connected' })
      },
      sessionDisconnected: () => {
        this.setState({ connection: 'Disconnected' })
      },
      sessionReconnected: () => {
        this.setState({ connection: 'Reconnected' })
      },
      sessionReconnecting: () => {
        this.setState({ connection: 'Reconnecting' })
      }
    }

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source')
      },
      streamCreated: () => {
        console.log('Publisher stream created')
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`)
      }
    }

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled')
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled')
      }
    }
  }
  async componentDidMount(evt) {
    await this.setState({ publishAudio: this.props.audio })
    if (this.props.user === 'first') {
      await this.setState({ publishAudio: true })
    }
  }

  async handleSubscribe(evt) {
    await this.setState({ subscriber: true })
    //set to true when someone has connected, which starts timer
    console.log('subscriber is here!')
  }
  onSessionError = error => {
    this.setState({ error })
  }

  onPublish = () => {
    console.log('Publish Success')
  }

  onPublishError = error => {
    this.setState({ error })
  }

  onSubscribe = () => {
    console.log('Subscribe Success')
    this.handleSubscribe()
  }

  onSubscribeError = error => {
    this.setState({ error })
  }

  toggleVideo = () => {
    this.setState({ publishVideo: !this.state.publishVideo })
  }

  toggleAudio = () => {
    this.setState({ publishAudio: !this.state.publishAudio })
  }

  getNewSeconds = sec => {
    if (sec !== this.state.seconds) {
      return sec
    } else {
      return sec + 0.0000001
    }
  }
  async handleComplete(evt) {
    if (this.state.count > 0) {
      await this.setState({
        seconds: this.getNewSeconds(10),
        publishAudio: !this.state.publishAudio,
        count: +this.state.count++
      })
    } else {
      this.setState({ count: 1, seconds: this.getNewSeconds(10) })
    }
  }

  async handleClick(evt) {
    await this.props.deleteVideoSessionThunk({
      sessionId: this.props.sessionId,
      token: this.props.token
    })

    history.push('/feedback')
  }

  render() {
    const apiKey = this.props.apiKey
    const sessionId = this.props.sessionId
    const token = this.props.token
    const { error, connection, publishVideo, count, publishAudio } = this.state

    return (
      <div>
        {this.state.subscriber ? (
          <div>
            {count < 1 ? (
              <h2>Starting in:</h2>
            ) : (
              <div>
                {publishAudio ? (
                  <div className="flex">
                    <span className="padding">
                      <h2 className="bold">Your Turn</h2>
                    </span>
                    <h2 className="ml-3"> Their Turn</h2>
                  </div>
                ) : (
                  <div className="flex">
                    <h2>Your Turn</h2>
                    <span className="padding">
                      <h2 className="ml-3 bold"> Their Turn</h2>
                    </span>
                  </div>
                )}
              </div>
            )}
            <ReactCountdownClock
              seconds={this.state.seconds}
              color="#000"
              alpha={0.9}
              size={100}
              pause={true}
              onComplete={this.handleComplete}
            />
          </div>
        ) : (
          <div id="waiting-for-burster">
            <h4>Waiting for your fellow Burster!</h4>
          </div>
        )}

        {error ? (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        ) : null}
        <OTSession
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
          onComplete={this.handleComplete}
          publishAudio={this.state.publishAudio}
          onSubscribe={this.handleSubscribe}
        >
          {/* <button id="videoButton" onClick={this.toggleVideo}>
            {publishVideo ? 'Disable' : 'Enable'} Video
          </button> */}

          {/* {this.state.publishAudio ? <h2> Audio On!</h2> : <h5>Audio Off!</h5>} */}
          <OTPublisher //shows your video
            properties={{
              publishVideo,
              insertMode: 'append',
              width: '15vw',
              height: '15vh'
            }}
            publishAudio={this.state.publishAudio}
            onPublish={this.onPublish}
            onError={this.onPublishError}
            eventHandlers={this.publisherEventHandlers}
            id="publisherWindow"
            onComplete={this.handleComplete}
            apiKey={apiKey}
          />

          <OTStreams>
            <OTSubscriber //shows other person's video
              properties={{
                insertMode: 'append',
                width: '75vw',
                height: '75vh'
              }}
              onError={this.onSubscribeError}
              eventHandlers={this.subscriberEventHandlers}
              id="subscriberWindow"
              onChange={this.handleChange}
              onSubscribe={this.handleSubscribe}
              apiKey={apiKey}
            />
          </OTStreams>
        </OTSession>
        <button id="leave-session-btn">
          <Link to="/feedback" onClick={this.handleClick}>
            Leave Session
          </Link>
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    deleteVideoSessionThunk: session =>
      dispatch(deleteVideoSessionThunk(session))
  }
}

export default connect(
  null,
  mapDispatch
)(OpenTok)
