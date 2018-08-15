const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('cb968b25a11945c6a4056027b3a69002') //TODO: do we need to hide this?
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { Source, User, Topic } = require('../db/models')

const News = class {
  constructor(user) {
    this.topics = user.topics,
      this.sources = user.sources,
      this.poliOriId = user.poliOriId
  }

  //METHODS
  stringifyTopics() {
    this.topics.map(topic => {
      return topic.searchValue
    })
      .join(' OR ')
  }

  //this will be used with both this.sources and oppSources
  stringifySources(sources) {
    this.sources.map(source => {
      return source.newsApiId
    })
      .join(',')
  }

  //does this need to be a method?
  createDate(days, months, years) {
    var date = new Date()
    date.setDate(date.getDate() + days)
    date.setMonth(date.getMonth() + months)
    date.setFullYear(date.getFullYear() + years)
    return date.toISOString()
  }

  getOppIds() {
    let oppPoliIds = []
    if (this.poliOriId < 3) {
      oppPoliIds.push(this.poliOriId + 1, this.poliOriId + 2)
    } else if (this.poliOriId > 3) {
      oppPoliIds.push(this.poliOriId - 1, this.poliOriId - 2)
    } else if ((this.poliOriId = 3)) {
      oppPoliIds.push(this.poliOriId + 1, this.poliOriId - 1)
    }
    return oppIds
  }

  getOppSources(oppIds) {
    await Source.findAll({
      where: {
        poliOriId: {
          [Op.or]: [{ [Op.eq]: oppIds[0] }, { [Op.eq]: oppIds[1] }]
        },
        newsApiId: {
          [Op.ne]: null
        }
      }
    })
  }

  InBubble() {
    const stringOfTopics = this.stringifyTopics()
    const stringOfSources = this.stringifySources(this.sources)

    const inBubble = await newsapi.v2.everything({
      q: stringOfTopics,
      sources: stringOfSources,
      sortBy: 'relevancy',
      language: 'en',
      from: this.createDate(0, -1, 0)
    })
    return inBubble
  }

  OutOfBubble() {
    const stringOfTopics = this.stringifyTopics()
    const oppIds = this.getOppIds()
    const oppSources = this.getOppSources(oppIds)
    const stringOfOppSources = this.stringifySources(oppSources)

    const outOfBubble = await newsapi.v2.everything({
      q: stringOfTopics,
      sources: stringOfOppSources,
      sortBy: 'relevancy',
      language: 'en',
      from: this.createDate(0, -1, 0)
    })

    //add key out:true key to denote out of bubble articles
    const outofBubbleWithKey = outOfBubble.articles.slice(0, 6).map(obj => {
      return { ...obj, out: true }
    })

    return outofBubbleWithKey
  }

  get combinedArticleList() {
    //join outOfBubble and inBubble arrays
    const outOfBubbleWithKey = this.getOutOfBubble()
    const inBubble = this.InBubble()
    const inAndOutArr = inBubble.articles.slice(0, 14).concat(outOfBubbleWithKey)

    function randomize(arr) {
      let currentIndex = arr.length
      let tempVal
      let randomIdx

      while (0 !== currentIndex) {
        randomIdx = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        tempVal = arr[currentIndex]
        arr[currentIndex] = arr[randomIdx]
        arr[randomIdx] = tempVal
      }
      return arr
    }

    const combinedArticleList = randomize(inAndOutArr)
    return combinedArticleList
  }

}

