const db = require('./db')
const { User, Source, Topic } = require('./models')

User.BelongsToMany(Source, { through: 'UserSource' })
Source.BelongsToMany(User, { through: 'UserSource' })

User.BelongsToMany(Topic, { through: 'UserTopic' })
Topic.BelongsToMany(User, { through: 'UserTopic' })

User.hasOne(PoliOri)
Source.hasOne(PoliOri)

PoliOri.hasMany(Source)
PoliOri.hasMany(User)

module.exports = { User, Source, Topic }
