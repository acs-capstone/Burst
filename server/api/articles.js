const router = require('express').Router()
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('cb968b25a11945c6a4056027b3a69002') //TODO: do we need to hide this?
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Source = require('../db/models/Source')
module.exports = router

//this wil take a userid, needs user with topics & sources
router.put('/:id', async (req, res, next) => {
  try {
    const topics = req.body.topics //may need to change to user.topics?
    const sources = req.body.sources
    const poliOriId = req.body.poliOriId

    console.log('TOPICS ON USER', req.body)
    const stringOfTopics = topics
      .map(topic => {
        return topic.name
      })
      .join(',')

    const stringify = arrOfSources => {
      return arrOfSources
        .map(source => {
          return source.newsApiId
        })
        .join(',')
    }

    const inBubble = await newsapi.v2.everything({
      q: stringOfTopics,
      sources: stringify(sources)
    })

    const oppSources = await Source.findAll({
      where: {
        poliOriId: +poliOriId + 2, // TODO: need to add bubble burst algo here
        newsApiId: {
          [Op.ne]: null
        }
      }
    })

    const outOfBubble = await newsapi.v2.everything({
      q: stringOfTopics,
      sources: stringify(oppSources)
    })

    res.json({ inBubble, outOfBubble })
  } catch (error) {
    console.error(error)
  }
})
