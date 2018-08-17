const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('cb968b25a11945c6a4056027b3a69002') //TODO: do we need to hide this?
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Source = require('./Source')

const News = class {
  constructor(user) {
    ;(this.topics = user.topics),
      (this.sources = user.sources),
      (this.poliOriId = user.poliOriId)
  }
  //METHODS
  stringifyTopics() {
    return this.topics
      .map(topic => {
        return topic.searchValue
      })
      .join(' OR ')
  }

  //this will be used with both this.sources and oppSources
  stringifySources(sources) {
    return sources
      .map(source => {
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
    let oppIds = []
    if (this.poliOriId < 3) {
      oppIds.push(this.poliOriId + 1, this.poliOriId + 2)
    } else if (this.poliOriId > 3) {
      oppIds.push(this.poliOriId - 1, this.poliOriId - 2)
    } else if ((this.poliOriId = 3)) {
      oppIds.push(this.poliOriId + 1, this.poliOriId - 1)
    }
    return oppIds
  }

  async getOppSources(oppIds) {
    const oppSources = await Source.findAll({
      where: {
        poliOriId: {
          [Op.or]: [{ [Op.eq]: oppIds[0] }, { [Op.eq]: oppIds[1] }]
        },
        newsApiId: {
          [Op.ne]: null
        }
      }
    })
    const filteredOppSources = oppSources.filter(oppSource => {
      const userNewsApis = this.sources.map(source => source.newsApiId)
      return !userNewsApis.includes(oppSource.newsApiId)
    })
    return filteredOppSources
  }

  async inBubble() {
    const stringOfTopics = await this.stringifyTopics()
    const stringOfSources = await this.stringifySources(this.sources)

    const inBubble = await newsapi.v2.everything({
      q: stringOfTopics,
      sources: stringOfSources,
      sortBy: 'popularity',
      language: 'en',
      from: this.createDate(-2, 0, 0)
    })
    return inBubble
  }

  async outOfBubble() {
    const stringOfTopics = await this.stringifyTopics()
    const oppIds = await this.getOppIds()
    const oppSources = await this.getOppSources(oppIds)
    const stringOfOppSources = await this.stringifySources(oppSources)

    const outOfBubble = await newsapi.v2.everything({
      q: stringOfTopics,
      sources: stringOfOppSources,
      sortBy: 'popularity',
      language: 'en',
      from: this.createDate(-2, 0, 0)
    })
    console.log('OOB LENGTH', outOfBubble.totalResults)
    //add key out:true key to denote out of bubble articles
    const outofBubbleWithKey = outOfBubble.articles.slice(0, 6).map(obj => {
      return { ...obj, out: true }
    })

    return outofBubbleWithKey
  }

  mostPopularByTopic = async () => {
    const topics = await Topic.findAll()
    const topicNames = topics.map(topic => topic.name)
    console.log(topicNames)
    // await newsapi.v2.everything({
    //   q: stringOfTopics,
    //   sources: stringOfSources,
    //   sortBy: 'relevancy',
    //   language: 'en',
    //   from: this.createDate(0, -1, 0)
    // })
  }

  //This method calls the other methods above
  async getCombinedArticleList() {
    const outOfBubbleWithKey = await this.outOfBubble()
    const inBubble = await this.inBubble()

    //join outOfBubble and inBubble arrays
    const inAndOutArr = inBubble.articles
      .slice(0, 14)
      .concat(outOfBubbleWithKey)

    //randomize the array of articles
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

module.exports = News
