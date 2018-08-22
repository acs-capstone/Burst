var cheerio = require('cheerio')
var cheerioAdv = require('cheerio-advanced-selectors')
cheerio = cheerioAdv.wrap(cheerio)
const fs = require('fs')
const pages = [
  './allsides0.html',
  './allsides1.html',
  './allsides2.html',
  './allsides3.html',
  './allsides4.html',
  './allsides5.html'
]
const rankings = []
const poliOri = {
  Left: 1,
  'Lean Left': 2,
  Center: 3,
  'Lean Right': 4,
  Right: 5
}

function getCategories() {
  for (let i = 0; i < pages.length; i++) {
    const text = fs.readFileSync(pages[i], 'utf-8')
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
        ratingStripped = rating.replace(
          'Political News Media Bias Rating: ',
          ''
        )
        source['name'] = title
        source['poliOriId'] = poliOri[ratingStripped]
        source['poliOriStr'] = ratingStripped
        rankings.push(source)
      }
    })
  }
  fs.writeFileSync('./rankings.json', JSON.stringify(rankings), 'utf-8')
  console.log(rankings)
  return rankings
}
getCategories()
module.exports = getCategories
