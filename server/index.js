const express = require('express')
const app = express()
const volleyball = require('volleyball')
const path = require('path')
const PORT = process.env.PORT || 8080
const db = require('./db')

// sends index.html
// app.use('*', (req, res) => {
//   console.log(path.join(__dirname, '..', '/public/index.html'))
//   res.sendFile(path.join(__dirname, '..', '/public/index.html'))
// })

app.use('/api', require('./api'))

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )
}

const syncDb = () => db.sync({ force: true })

const bootApp = () => {
  startListening()
  syncDb()
}

bootApp()

module.exports = app
