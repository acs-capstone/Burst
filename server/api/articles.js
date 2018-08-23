const router = require('express').Router()
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
