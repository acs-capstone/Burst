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

    // console.log('REQ BODY', req.body)

    const stringOfTopics = topics
      .map(topic => {
        return topic.name
      })
      .join(' OR ')

    //function to turn our array of sources into a string delimited by commas
    const stringify = arrOfSources => {
      return arrOfSources
        .map(source => {
          return source.newsApiId
        })
        .join(',')
    }

    //function to get date for oldest article allowed
    const createDate = (days, months, years) => {
      var date = new Date()
      date.setDate(date.getDate() + days)
      date.setMonth(date.getMonth() + months)
      date.setFullYear(date.getFullYear() + years)
      return date.toISOString()
    }

    const inBubble = await newsapi.v2.everything({
      q: stringOfTopics,
      sources: stringify(sources),
      sortBy: 'relevancy', //do we want to sort by relevancy?
      language: 'en',
      from: createDate(0, -1, 0)
    })

    //algorithm that determines what out of bubble sources you will get
    const getOppAlgo = (num) => {
      let oppPoliIds = []
      if (num < 3) {
        oppPoliIds.push(num + 1, num + 2)
      } else if (num > 3) {
        oppPoliIds.push(num - 1, num - 2)
      } else if (num = 3) {
        oppPoliIds.push(num + 1, num - 1)
      }
      return oppPoliIds
    }

    const oppIds = getOppAlgo(poliOriId)

    const oppSources = await Source.findAll({
      where: {
        poliOriId: {
          [Op.or]: [
            { [Op.eq]: oppIds[0] },
            { [Op.eq]: oppIds[1] }
          ]
        },
        newsApiId: {
          [Op.ne]: null
        }
      }
    })

    console.log('STRINGIFY', stringify(oppSources))

    const outOfBubble = await newsapi.v2.everything({
      q: stringOfTopics,
      sources: stringify(oppSources),
      sortBy: 'relevancy', //do we want to sort by relevancy?
      language: 'en',
      from: createDate(0, -1, 0)
    })
    //add key out:true key to denote out of bubble articles
    const outWithKey = outOfBubble.articles.slice(0, 6).map(obj => { return { ...obj, out: true } })
    //join outOfBubble and inBubble arrays
    const inAndOutArr = inBubble.articles.slice(0, 14).concat(outWithKey)

    //randomize order of articles function
    function randomize(arr) {
      let currentIndex = arr.length
      let tempVal;
      let randomIdx;

      while (0 !== currentIndex) {
        randomIdx = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempVal = arr[currentIndex]
        arr[currentIndex] = arr[randomIdx]
        arr[randomIdx] = tempVal
      }
      return arr
    }

    const combinedArticleList = randomize(inAndOutArr)
    res.json(combinedArticleList) //sends array of randomized articles

  } catch (error) {
    console.error(error)
  }
})
