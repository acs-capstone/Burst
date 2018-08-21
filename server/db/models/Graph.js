const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Source = require('./Source')
const Topic = require('./Topic')
const PoliOri = require('./PoliOri')

const fs = require('fs')
const path = require('path')

//read files in, and then I will have to match sources with the sources from the models
let nodeKey = 0
const allFiles = fs.readdirSync('./popular')
const allArticles = []
const nodes = []
const links = []

const colors = {
  1: '#283593',
  2: '#9FA8DA',
  3: '#ECEFF1',
  4: '#E57373',
  5: '#B71C1C'
}
const files = allFiles

const sources = require('../../parser/newsApi/intersection')

const readFiles = files => {
  files.map(file => {
    const txt = fs.readFileSync('./popular/' + file, 'utf-8')
    const articles = JSON.parse(txt).articles
    return articles
  })
}

const electionFiles = files.filter(file => file.includes('Election'))
const energyFiles = files.filter(file => file.includes('Energy'))
const financeFiles = files.filter(file => file.includes('Finance'))
const gunFiles = files.filter(file => file.includes('Gun'))
const humanFiles = files.filter(file => file.includes('Human'))
const immigrationFiles = files.filter(file => file.includes('Immigration'))
const intFiles = files.filter(file => file.includes('International'))
const tradeFiles = files.filter(file => file.includes('Trade'))

const createNodes = files => {
  const articles = readFiles(files)
  articles.map(article => createNode(article))
}

const createNode = article => {
  console.log(article)
  const poliOriId = sources.find(
    source => source.newsApiId === article.source.id
  ).poliOriId
  const node = {
    id: nodeKey, // might need to be string
    source: article.source.id,
    topic: 'topic',
    title: article.title,
    desc: article.description,
    color: colors[poliOriId],
    url: article.url,
    urlToImage: article.urlToImage,
    poliOriId: poliOriId
  }
  nodeKey++
  nodes.push(node)
  console.log(node)
}
createNodes(electionFiles)
console.log(nodes)
//
// const randInt = () => {
//   return Math.floor(Math.random() * colors.length)
// }
//

// allArticles is an array w/ each article, with article.source.id = newsApiId
// so we can loop through sources to find the poliori

// const findPoliOri = sources => {
//   sources.find(id => {
//     return source.newsApiId === id
//   })
// }

// const sources = Source.find({ include: PoliOri })

//goal: make sure all of the results in the scrape are in our sources
