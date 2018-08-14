const sources = require('./parser/intersection.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { Source, PoliOri, Topic, User } = require('./db/models/')
const db = require('./db')

console.log(sources)
const topics = [
  {
    name: 'Women’s Rights',
    searchValue: '(Women’s AND Rights)'
  },
  {
    name: 'Finance & Tax',
    searchValue: '(Finance AND Tax)'
  },
  {
    name: 'Gun Control',
    searchValue: '(Gun AND Control)'
  },
  {
    name: 'Immigration',
    searchValue: 'Immigration'
  },
  {
    name: 'Elections',
    searchValue: 'Elections'
  },
  {
    name: 'Energy & Environment',
    searchValue: '(Energy AND Enviornment)'
  },
  {
    name: 'International Relations',
    searchValue: '(International AND Relations)'
  },
  {
    name: 'Healthcare',
    searchValue: 'Healthcare'
  },
  {
    name: 'Trade',
    searchValue: 'Trade'
  }
]

const poliOriSeed = async () => {
  try {
    await Promise.all([
      PoliOri.create({ poliOri: 'Left' }),
      PoliOri.create({ poliOri: 'Lean Left' }),
      PoliOri.create({ poliOri: 'Center' }),
      PoliOri.create({ poliOri: 'Lean Right' }),
      PoliOri.create({ poliOri: 'Right' })
    ])
  } catch (err) {
    console.log(err)
  }
}
const topicSeed = async () => {
  await Promise.all(topics.map(topic => Topic.create(topic)))
  console.log(`seeded ${topics.length} sources`)
}

const sourceSeed = async () => {
  await Promise.all(sources.map(source => Source.create(source)))
  console.log(`seeded ${sources.length} sources`)
}

const userSeed = async () => {
  const user = await User.create({
    email: 'cody@email.com',
    password: '123',
    poliOriId: 2
  })
  const topics = await Topic.findAll({
    where: { [Op.or]: [{ id: 1 }, { id: 3 }, { id: 5 }] }
  })

  const sources = await Source.findAll({
    where: { [Op.or]: [{ id: 9 }, { id: 3 }, { id: 12 }] }
  })
  console.log(topics)
  console.log(sources)
  await user.addTopics(topics)
  await user.addSources(sources)
  console.log(`seeded user `)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await db.sync({ force: true })
    console.log('db synced!')
    await Promise.all([poliOriSeed(), topicSeed(), sourceSeed(), userSeed()])
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}
runSeed()
