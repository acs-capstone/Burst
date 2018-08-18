import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import '@opentok/client';
import OpenTok from './OpenTok';
// import './index.css';
// import './polyfills';

import {
  // SAMPLE_SERVER_BASE_URL,
  API_KEY,
  SESSION_ID,
  TOKEN
} from '../secrets';

export default class VideoParent extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <OpenTok apiKey={API_KEY} sessionId={SESSION_ID} token={TOKEN} />
    )
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
