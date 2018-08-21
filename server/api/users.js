const router = require('express').Router()
const { User, Source, Topic, PoliOri } = require('../db/models')
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

//gets user data by Id - need a Poli Id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      include: [{ model: Source }, { model: Topic }, { model: PoliOri }]
    })
    //this gets us the 'bubble bursting' sources
    // const oppSources = await Source.findAll({
    //   where: { poliOriId: user.poliOriId + 2 } // TODO: need to add bubble burst algo here
    // })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

//updates user instance after quiz - needs poliOriId, arrayOfSources, arrayOfTopics
//TODO: make sure route is protected, using req.session for user Id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (req.body.poliOriId) {
      await user.update({ poliOriId: req.body.poliOriId })
    }
    if (req.body.arrayOfSources) {
      await user.setSources(req.body.arrayOfSources)
    }
    if (req.body.arrayOfTopics) {
      await user.setTopics(req.body.arrayOfTopics)
    }
    const updatedUser = await User.findById(req.params.id, {
      include: [{ model: Source }, { model: Topic }, { model: PoliOri }]
    })

    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

//userPrefObj = {
//   userId: 0
//   poliOriId: 0
//   arrayOfSources: []
//   arrayOfTopics: []
// }
