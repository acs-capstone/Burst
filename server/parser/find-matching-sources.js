const allSidesSourcesObjects = require('./all-sides-sources-and-rankings.json')
const newsApiSources = require('../scraper/sources.js')

allSidesSourcesObjects.map(obj => {
  return (obj['newsApiName'] = obj.name
    .toLowerCase()
    .split(' ')
    .join('-'))
})

const intersection = allSidesSourcesObjects.filter(source => {
  console.log(newsApiSources.includes(source.newsApiName))
  console.log(source.newsApiName)
})

module.exports = allSidesSourcesObjects
