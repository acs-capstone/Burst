const router = require('express').Router()
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('cb968b25a11945c6a4056027b3a69002') //TODO: do we need to hide this?
module.exports = router

//this wil take a userid, needs user with topics & sources
router.put('/:id', async (req, res, next) => {
  try {
    //get inbubble articles
    const topics = req.body.topics //user.topics?
    // const sources = req.body.sources
    // const stringOfTopics = topics.map(topic => {
    //   return topic.name
    // }).join(',')
    newsapi.v2.everything({
      q: topics
    }).then(response =>
      res.json(response))
  } catch (error) {
    console.error(error)
  }
})
