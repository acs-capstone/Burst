const OpenTok = require('opentok')

const router = require('express').Router()
const apiKey = process.env.VIDEO_API_KEY
const apiSecret = process.env.VIDEO_API_SECRET
const opentok = new OpenTok(apiKey, apiSecret)
const { VideoSession } = require('../db/models')

module.exports = router

router.get('/:id', async (req, res, next) => {
  //see if session is open with one participent (will only have one token)
  const openSession = await VideoSession.findOne({
    where: {
      token2: null,
      topicId: req.params.id
    }
  })

  //if there is no open session, create a new session and a token for first participant
  if (openSession === null) {
<<<<<<< HEAD
    console.log('API KEY IN GET ID!!!', apiKey)
    await opentok.createSession(async function (err, session) {
=======
    await opentok.createSession(async function(err, session) {
>>>>>>> master
      if (err) return console.log(err)

      const token1 = await opentok.generateToken(session.sessionId)
      const newSession = await VideoSession.create({
        sessionId: session.sessionId,
        topicId: req.params.id,
        token1
      })

      res.json({
        sessionId: newSession.sessionId,
        token: token1,
        user: 'first'
      })
    })
  } else {
    //otherwise create the second token for second participent to join existing session
    const token2 = await opentok.generateToken(openSession.sessionId)
    const fullSession = await openSession.update({ token2 })
    res.json({
      sessionId: fullSession.sessionId,
      token: token2,
      user: 'second'
    })
  }
})

router.delete('/disconnect/:sessionId', async (req, res, next) => {
  const session = await VideoSession.findOne({
    where: {
      sessionId: req.params.sessionId
    }
  })
  await session.destroy()
  res.send('session destroyed')
})
