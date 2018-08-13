const router = require('express').Router()
const { Source } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//gets all sources from db
router.get('/', async (req, res, next) => {
  try {
    const sources = await Source.findAll({
      where: {
        newsApiId: {
          [Op.ne]: null
        }
      }
    })
    res.json(sources)
  } catch (err) {
    next(err)
  }
})
