const fs = require('fs')
const allSidesSourcesObjects = require('./allSides/all-sides-sources-and-rankings.json')
const newsApiSources = require('../scraper/sources.js')

allSidesSourcesObjects.map(obj => {
  return (obj['newsApiId'] = obj.name
    .toLowerCase()
    .split(' ')
    .join('-'))
})

const intersection = []
const nonIntersection = []
allSidesSourcesObjects.filter(source => {
  if (newsApiSources.includes(source.newsApiId)) {
    intersection.push(source)
  } else {
    nonIntersection.push(source)
  }
})

// console.log(nonIntersection.length)
// console.log(intersection.length)
console.log(intersection)

fs.writeFileSync('./intersection.js', JSON.stringify(intersection))
fs.writeFileSync('./nonIntersection.js', JSON.stringify(nonIntersection))
module.exports = allSidesSourcesObjects
