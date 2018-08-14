const allSidesSourcesObjects = require('./all-sides-sources-and-rankings.json')
const newsApiSources = require('../scraper/sources.js')

allSidesSourcesObjects.map(obj => {
  return (obj['newsApiName'] = obj.name
    .toLowerCase()
    .split(' ')
    .join('-'))
})

module.exports = allSidesSourcesObjects
