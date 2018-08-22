const router = require('express').Router()
const NewsAPI = require('newsapi')
// const newsapi = new NewsAPI('cb968b25a11945c6a4056027b3a69002') //TODO: do we need to hide this?
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { Source, User, Topic, News } = require('../db/models')
module.exports = router

//this wil take a userid, needs user with topics & sources
router.get('/popular', async (req, res, next) => {
  try {
    const popularTopics = await News.mostPopularByTopic()
    //console.log('***api/article:', popularTopics)
    res.json(popularTopics)
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      include: [{ model: Source }, { model: Topic }]
    })
    //way to do this using static methods on News? Need to pass through user
    const news = new News(user)
    const articles = await news.getCombinedArticleList()

    res.json(articles)
  } catch (error) {
    console.error(error)
  }
})
