const OpenTok = require('opentok')

const opentok = new OpenTok(apiKey, apiSecret)
const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET
const router = require('express').Router()
module.exports = router

router.get('/start', async (req, res, next) => {
  // Create a session that will attempt to transmit streams directly between
  // clients. If clients cannot connect, the session uses the OpenTok TURN server:

  const session = opentok.createSession(function(err, session) {
    if (err) return console.log(err)

    // save the sessionId
    db.save('session', session.sessionId, done)
  })

  const token = sessions.generateToken()
})

router.get('/disconnect', async (req, res, next) => {
  opentok.forceDisconnect(sessionId, connectionId)
})
