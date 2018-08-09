const Sequelize = require('sequelize')
const db = require('../db')

const Source = db.define('source', {
  name: {
    type: Sequelize.STRING
  },
  poliOri: {
    type: Sequelize.INTEGER
  }
})

module.exports = Source
