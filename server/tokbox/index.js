const OpenTok = require('opentok')

const router = require('express').Router()
const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET
const opentok = new OpenTok(apiKey, apiSecret)
const { Session } = require('../db/models')

module.exports = router

router.get('/start', async (req, res, next) => {
  //see if session is open with one participent (will only have one token)
  const openSession = await Session.findOne({
    where: {
      token2: null
    }
  })

  //if there is no open session, create a new session and a token for first participant
  if (openSession === null) {
    await opentok.createSession(async function(err, session) {
      if (err) return console.log(err)

      const token1 = await opentok.generateToken(session.sessionId)
      const newSession = await Session.create({
        sessionId: session.sessionId,
        token1
      })

      res.json({ sessionId: newSession.sessionId, token: token1 })
    })
  } else {
    //otherwise create the second token for second participent to join existing session
    const token2 = await opentok.generateToken(openSession.sessionId)
    const fullSession = await openSession.update({ token2 })
    res.json({ sessionId: fullSession.sessionId, token: token2 })
  }
})

router.get('/disconnect', async (req, res, next) => {
  opentok.forceDisconnect(sessionId, connectionId)
})
