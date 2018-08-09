const Sequelize = require('sequelize')
const db = require('../db')

const PoliOri = db.define('poliOri', {
  poliOri: {
    type: Sequelize.STRING
  }
})

module.exports = PoliOri
