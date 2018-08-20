import React from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'
import { connect } from 'react-router-dom'
export default class OpenTok extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
      publishAudio: this.props.audio || false
    }

    this.sessionEventHandlers = {
      sessionConnected: async () => {
        await this.setState({ connection: 'Connected' })
        console.log('USER', this.props.user)
        // if (this.props.user === 'first') {
        //   await this.setState({ publishAudio: true })
        // }
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
    this.props.handleSubscribe()
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

  render() {
    const apiKey = this.props.apiKey
    const sessionId = this.props.sessionId
    const token = this.props.token
    const { error, connection, publishVideo, publishAudio } = this.state
    return (
      <div>
        <div id="sessionStatus">Session Status: {connection}</div>
        {error ? (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        ) : null}
        <OTSession
          apiKey={apiKey}
          publishAudio={this.state.publishAudio}
          sessionId={sessionId}
          token={token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
        >
          <button id="videoButton" onClick={this.toggleVideo}>
            {publishVideo ? 'Disable' : 'Enable'} Video
          </button>

          {/* <button id="audioButton" onClick={this.toggleAudio}>
            {publishAudio ? 'Disable' : 'Enable'} Audio
          </button> */}
          {this.state.publishAudio ? <h2> Audio On!</h2> : <h5>Audio Off!</h5>}
          <OTPublisher //shows your video
            properties={{
              publishVideo,
              insertMode: 'append',
              width: '15vw',
              height: '15vh'
            }}
            onPublish={this.onPublish}
            onError={this.onPublishError}
            eventHandlers={this.publisherEventHandlers}
            id="publisherWindow"
          />

          <OTStreams>
            <OTSubscriber //shows other person's video
              properties={{
                insertMode: 'append',
                width: '75vw',
                height: '75vh'
              }}
              onSubscribe={this.onSubscribe}
              onError={this.onSubscribeError}
              eventHandlers={this.subscriberEventHandlers}
              id="subscriberWindow"
            />
          </OTStreams>
        </OTSession>
      </div>
    )
  }
}
