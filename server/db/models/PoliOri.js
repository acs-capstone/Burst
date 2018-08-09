const Sequelize = require('sequelize')
const db = require('../db')

const PoliOri = db.define('poliori', {
  poliOri: {
    type: Sequelize.STRING
  }
})

module.exports = PoliOri
