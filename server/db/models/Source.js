const Sequelize = require('sequelize')
const db = require('../db')

const Source = db.define('source', {
  name: {
    type: Sequelize.STRING
  },
  newsApiId: { type: Sequelize.STRING }
})

module.exports = Source
