var cheerio = require('cheerio')
var cheerioAdv = require('cheerio-advanced-selectors')
cheerio = cheerioAdv.wrap(cheerio)
const fs = require('fs')
const path = require('path')
const newsapipage = path.join(__dirname, '/newsApi.org.sources.html')

const sourcesObj = {}
function getIds() {
  const text = fs.readFileSync(newsapipage, 'utf-8')
  const $ = cheerio.load(text)
  const sources = []
  $('.source').each(function(i, elem) {
    const source = {}
    const name = $(this)
      .find('.name')
      .text()
      .trim()

    const id = $(this)
      .find('kbd')
      .text()
      .trim()

    source['id'] = id
    source['name'] = name
    sourcesObj[name] = id

    sources.push(source)
  })

  fs.writeFileSync('./sourceIds.json', JSON.stringify(sources), 'utf-8')

  return sources
}

getIds()

module.exports = sourcesObj
