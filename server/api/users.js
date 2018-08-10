const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

//Do we need this? when would we get all users?
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//updates user instance after quiz - needs poliOriId, arrayOfSources, arrayOfTopics
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    user.update({ poliOriId: req.body.poliOriId })
    user.setSources(req.body.arrayOfSources)
    user.setTopics(req.body.arrayOfTopics)
  } catch (err) {
    next(err)
  }
})

