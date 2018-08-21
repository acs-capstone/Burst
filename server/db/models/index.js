const User = require('./User')
const Source = require('./Source')
const Topic = require('./Topic')
const PoliOri = require('./PoliOri')
const News = require('./News')
const VideoSession = require('./VideoSession')

User.belongsToMany(Source, { through: 'UserSource' })
Source.belongsToMany(User, { through: 'UserSource' })

User.belongsToMany(Topic, { through: 'UserTopic' })
Topic.belongsToMany(User, { through: 'UserTopic' })

User.belongsTo(PoliOri)
Source.belongsTo(PoliOri)

PoliOri.hasMany(Source)
PoliOri.hasMany(User)

VideoSession.belongsTo(Topic)
Topic.hasMany(VideoSession)

module.exports = { User, Source, Topic, PoliOri, News, VideoSession }
