import React, { Component } from 'react'
import { connect } from 'react-redux'
// import ReactDOM from 'react-dom';
import '@opentok/client'
import OpenTok from './OpenTok'
// import './index.css';
// import './polyfills';
import { getSessionThunk } from '../store/session'

import {
  // SAMPLE_SERVER_BASE_URL,
  API_KEY,
  SESSION_ID,
  TOKEN
} from '../secrets'

class VideoParent extends Component {
  constructor() {
    super()
  }

  async componentDidMount(evt) {
    console.log('hi d')
    await this.props.getSessionThunk()
    console.log('currentSession', this.props.session)
    //thunk creator to dispatch and get session id from db
  }

  render() {
    const sessionId = this.props.session.sessionId
    const token = this.props.session.token

    return sessionId && token ? (
      <OpenTok apiKey={API_KEY} sessionId={sessionId} token={token} />
    ) : (
        <h3>Loading...</h3>
      )
    // return (
    //   <div>
    //     <h3>{sessionId}</h3>
    //     <h5>{token}</h5>
    //   </div>
    // )
  }

  //   if(API_KEY && TOKEN && SESSION_ID) {
  //   renderApp({
  //     apiKey: API_KEY,
  //     sessionId: SESSION_ID,
  //     token: TOKEN,
  //   });
  // } else {
  //   fetch(SAMPLE_SERVER_BASE_URL + '/session')
  //     .then(data => data.json())
  //     .then(renderApp)
  //     .catch((err) => {
  //       console.error('Failed to get session credentials', err);
  //       alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
  //     });
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
