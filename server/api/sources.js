const router = require('express').Router()
const { Source } = require('../db/models')
module.exports = router

//gets all sources from db
router.get('/', async (req, res, next) => {
  try {
    const sources = await Source.findAll()
    res.json(sources)
  } catch (err) {
    next(err)
  }
})
