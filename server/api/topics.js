const router = require('express').Router()
const { Topic } = require('../db/models')
module.exports = router

//gets all sources from db
router.get('/', async (req, res, next) => {
  try {
    const topics = await Topic.findAll()
    res.json(topics)
  } catch (err) {
    next(err)
  }
})
