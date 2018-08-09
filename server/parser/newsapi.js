const fs = require('fs')
const NewsAPI = require('newsapi')
const JSON = require('json5')
const newsapi = new NewsAPI('5a335ee0f79144b19f861a318dc5286e')

// To query /v2/everything
// You must include at least one q, source, or domain
const getData = async () => {
  const bc = newsapi.v2
    .everything({
      q: 'bitcoin',
      from: '2018-08-01',
      to: '2018-08-08',
      language: 'en'
    })
    .then(response => {
      console.log(response)
      /*
    {
      status: "ok",
      articles: [...]
    }
  */

      const jsonData = JSON.stringify(response)

      fs.writeFileSync('bitcoin.json', jsonData, function(err) {
        if (err) {
          console.log(err)
        }
      })
    })
}

getData()
