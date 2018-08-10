var cheerio = require('cheerio')
var cheerioAdv = require('cheerio-advanced-selectors')
cheerio = cheerioAdv.wrap(cheerio)
const fs = require('fs')
const newsapipage = newsApi.org.sources.html

function get() {
  const text = fs.readFileSync(newsapipage, 'utf-8')
  const $ = cheerio.load(text)

  $('tr').each(function(i, elem) {
    const source = {}
    // get title text
    const title = $(this)
      .find('.source-title')
      .text()
      .trim()
    const rating = $(this)
      .find('[typeof="foaf:Image"]')
      .attr('title')
    if (rating) {
      ratingStripped = rating.replace('Political News Media Bias Rating: ', '')
      source['name'] = title
      source['poliOriId'] = poliOri[ratingStripped]
      source['poliOriStr'] = ratingStripped
      rankings.push(source)
    }
  })

  fs.writeFileSync('./rankings.json', JSON.stringify(rankings), 'utf-8')
  console.log(rankings)
  return rankings
}
