const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('202a83be1371436eba676836ec9a88c3')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Source = require('./Source')
const Topic = require('./Topic')
const fs = require('fs')
const path = require('path')

const PAGINATE_RESULTS = false
const News = class {
  constructor(user) {
    this.topics = user.topics
    this.sources = user.sources
    this.poliOriId = user.poliOriId
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
    //add key out:true key to denote out of bubble articles
    const outofBubbleWithKey = outOfBubble.articles.slice(0, 6).map(obj => {
      return { ...obj, out: true }
    })

    return outofBubbleWithKey
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

  //STATIC METHODS
  static createDate(days, months, years) {
    var date = new Date()
    date.setDate(date.getDate() + days)
    date.setMonth(date.getMonth() + months)
    date.setFullYear(date.getFullYear() + years)
    return date.toISOString()
  }

  static async mostPopularByTopic() {
    try {
      const topics = await Topic.findAll()
      const sources = await Source.findAll()
      const stringOfSources = sources.map(source => source.newsApiId).join(',')

      const popularArticles = Promise.all(
        topics.map(async topic => {
          //this is the same as before, just separated for easier viewing
          const query = {
            q: topic.searchValue,
            sources: stringOfSources,
            sortBy: 'popularity',
            language: 'en',
            from: this.createDate(-1, 0, 0)
          }

          const topicArticle = await newsapi.v2.everything(query)

          console.log(
            '\n\n\n QUERY RESULTS\n',
            topicArticle.totalResults,
            '\n\n\n'
          )

          if (PAGINATE_RESULTS && topicArticle.totalResults) {
            fs.writeFileSync(
              path.join(
                __dirname,
                '/scraper' + topic.name + ' query' + '.json'
              ),
              JSON.stringify(topicArticle)
            )
            paginateAndWriteResults(
              topic.name,
              query,
              topicArticle.totalResults
            )
          }

          const article = topicArticle.articles[0]
          article.topic = topic.name
          article.topicId = topic.id
          return article
        })
      )
      return popularArticles
    } catch (err) {
      console.log(err)
    }
  }
}

//topicArticle is newsApi result
//topicArticle.totalResults should be the number of results returned from the query
const paginateAndWriteResults = async (topicName, query, totalResults) => {
  const pages = Math.floor(totalResults / 20)

  console.log('\npaginating results...\n')

  for (let i = 2; i <= pages; i++) {
    try {
      query.page = i
      console.log('\nsending query', query.q)
      const queryResult = await newsapi.v2.everything(query)
      console.log(
        '\nquery results received for ',
        query.q,
        ', page: ',
        query.page,
        '\n'
      )
      console.log('writing query results...')

      fs.writeFileSync(
        path.join(__dirname, '/scraper' + topicName + ' query' + i + '.json'),
        JSON.stringify(queryResult)
      )
      console.log(
        'wrote ',

        __dirname,
        '/scraper' + topicName + ' query' + i + '.json'
      )
    } catch (e) {
      console.log('error paginating results!', e.name)
    }
  }
}
module.exports = News
