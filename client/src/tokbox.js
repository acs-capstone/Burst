// replace these values with those generated in your TokBox Account

import React, { Component } from 'react'

const apiKey = '46172752'
const sessionId =
  '2_MX40NjE3Mjc1Mn5-MTUzNDUyNDcyNDI4OX4zR1V6UlVTdFZTdzhoL3JwYzVOZmZYMU1-fg'
const token =
  'T1==cGFydG5lcl9pZD00NjE3Mjc1MiZzaWc9MjEwODRmMWI2NTE2NzUyMDQ0YWRjNDhlMTdhMzc3M2FjZjdhYmQ3NTpzZXNzaW9uX2lkPTJfTVg0ME5qRTNNamMxTW41LU1UVXpORFV5TkRjeU5ESTRPWDR6UjFWNlVsVlRkRlpUZHpob0wzSndZelZPWm1aWU1VMS1mZyZjcmVhdGVfdGltZT0xNTM0NTI0NzgzJm5vbmNlPTAuNDEwMTgwMDAwNDM0MzQ5OSZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTUzNDUyODM4MyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=='

// API KEY
// 46172752
// SECRET
// 321cc3f8d0b41c3849385deff6d6b1503d5f384b

export default // Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message)
  }
}

// (optional) add server code here
initializeSession()

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId)

  // Subscribe to a newly created stream

  session.on('streamCreated', function(event) {
    session.subscribe(
      event.stream,
      'subscriber',
      {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      },
      handleError
    )
  })

  // Create a publisher
  var publisher = OT.initPublisher(
    'publisher',
    {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    },
    handleError
  )

  // Connect to the session
  session.connect(
    token,
    function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error)
      } else {
        session.publish(publisher, handleError)
      }
    }
  )
}
