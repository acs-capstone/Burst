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

const electionFiles = files.filter(file => file.includes('Election'))
const energyFiles = files.filter(file => file.includes('Energy'))
const financeFiles = files.filter(file => file.includes('Finance'))
const gunFiles = files.filter(file => file.includes('Gun'))
const humanFiles = files.filter(file => file.includes('Human'))
const immigrationFiles = files.filter(file => file.includes('Immigration'))
const intFiles = files.filter(file => file.includes('International'))
const tradeFiles = files.filter(file => file.includes('Trade'))

const readFiles = files => {
  const chunk = []
  files.map(file => {
    const txt = fs.readFileSync('./popular/' + file, 'utf-8')
    console.log('reading files\n')
    const articles = JSON.parse(txt).articles
    console.log('read ' + articles.length + ' articles')
    chunk.push(...articles)
  })
  return chunk
}

const electionArticles = readFiles(electionFiles)
const energyArticles = readFiles(energyFiles)
const financeArticles = readFiles(financeFiles)
const gunArticles = readFiles(gunFiles)
const humanArticles = readFiles(humanFiles)
const immigrationArticles = readFiles(immigrationFiles)
const intArticles = readFiles(intFiles)
const tradeArticles = readFiles(tradeFiles)

console.log('**** ELECTION ARTICLES***', electionArticles.length)

const createNode = article => {
  console.log(article.topic)
  const poliOriId = sources.find(
    source => source.newsApiId === article.source.id
  ).poliOriId
  const node = {
    id: nodeKey, // might need to be string
    source: article.source.id,
    topic: article.topic,
    title: article.title,
    desc: article.description,
    color: colors[poliOriId],
    url: article.url,
    urlToImage: article.urlToImage,
    poliOriId: poliOriId
  }
  nodeKey++
  nodes.push(node)
  links.push({ source: node.topic, target: node.id })
}
const createNodes = (chunk, topic) => {
  console.log('creating nodes for', topic, '\n')

  chunk.map(article => {
    article.topic = topic
    createNode(article)
  })

  //push a node for each topic for the center of each cluster
  nodes.push({ id: topic, title: topic, color: '#808080' })

  console.log('created', chunk.length, 'nodes for', topic, '\n')
}
createNodes(electionArticles, 'Elections')
createNodes(energyArticles, 'Energy and Environment')
createNodes(financeArticles, 'Finance')
createNodes(gunArticles, 'Gun Control')
createNodes(humanArticles, 'Human Rights')
createNodes(immigrationArticles, 'Immigration')
createNodes(intArticles, 'International Relations')
createNodes(tradeArticles, 'Trade')

console.log(nodes.length, 'nodes were created.\n')
console.log(links.length, 'links were created.\n')

fs.writeFileSync(
  '../../../client/src/components/data-vis/nodes.json',
  JSON.stringify(nodes)
)
fs.writeFileSync(
  '../../../client/src/components/data-vis/links.json',
  JSON.stringify(links)
)
