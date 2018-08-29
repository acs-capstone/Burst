const fs = require('fs')
const allData = fs
  .readFileSync('./TopicsInDocs.csv', 'utf-8')
  .split('\n')
  .slice(1) //remove first row variable names
  .map(row => row.split(','))

// optionally set DATA_LENGTH to create a subset for testing
const DATA_LENGTH = 5
const FILE_PATH = '../../../client/src/components/data-vis/'

const data = allData.slice(0, DATA_LENGTH)
console.log(data)
const links = []
const nodes = []

const randInt = () => {
  return Math.floor(Math.random() * colors.length)
}

const colors = ['#f44242', '#4d41f4', '#c3bfff', '#ffb7b7', '#d1d1d1']
let uniqueNodeId = 0
let uniqueLinkId = 0

const trackNodes = {}
const trackLinks = {}

const createGraphData = rw => {
  //node is every other column
  for (let i = 2; i < rw.length - 2; i = i + 2) {
    const linkObject = {}
    const nodeObject = {}

    const idString = 'id' + rw[0]

    const source = idString
    const target = 'id' + rw[i]
    const join = source + target

    console.log('source:', source, 'target:', target)

    if (!trackNodes[source]) {
      nodeObject.id = idString
      nodeObject.key = uniqueNodeId
      nodeObject.name = idString
      nodeObject.val = 5
      nodeObject.color = colors[randInt()]
      trackNodes[source] = source
      console.log('node', uniqueNodeId, nodeObject, '\n\n')

      nodes.push(nodeObject)
      uniqueNodeId++
    }

    const link = source + target

    if (!trackLinks[link]) {
      linkObject.key = uniqueLinkId
      linkObject.source = source
      linkObject.target = target

      links.push(linkObject)
      uniqueLinkId++
      trackLinks[link] = true
      console.log('link', uniqueLinkId, linkObject, '\n\n')
    }
  }
}

console.log('\n\n\n START PARSING \n\n\n')
data.slice(0, DATA_LENGTH).map(row => createGraphData(row))
console.log('\n\n RESULTS \n\n')
console.log('nodes:', nodes)
console.log('\n\n')
console.log('links:', links)
console.log('\n\n')

fs.writeFileSync(FILE_PATH + 'links.json', JSON.stringify(links))
fs.writeFileSync(FILE_PATH + 'nodes.json', JSON.stringify(nodes))
