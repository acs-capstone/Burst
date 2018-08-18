const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define('session', {
  sessionId: {
    type: Sequelize.STRING
  },
  token1: {
    type: Sequelize.TEXT
  },
  token2: {
    type: Sequelize.TEXT
  }
})

module.exports = Session
