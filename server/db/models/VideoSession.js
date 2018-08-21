const Sequelize = require('sequelize')
const db = require('../db')

const VideoSession = db.define('videoSession', {
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

module.exports = VideoSession
