const sources = require('./parser/intersection.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { Source, PoliOri, Topic, User } = require('./db/models/')
const db = require('./db')

const topics = [
  {
    name: 'Human Rights',
    searchValue: `((human AND rights) OR (women AND rights) OR (feminism) OR (LGBTQ AND rights) OR (gay AND rights) OR (transgender AND rights) OR (race AND rights) NOT sports NOT sport)`
  },
  {
    name: 'Finance & Tax',
    searchValue: '((finance AND tax) OR finance OR (wall AND street) OR (U.S. AND taxes))'
  },
  {
    name: 'Gun Control',
    searchValue: `(gun AND control)`
  },
  {
    name: 'Immigration',
    searchValue: '(immigration OR immigrants OR (border AND wall))'
  },
  {
    name: 'Elections',
    searchValue: '((U.S. AND election) OR (state AND election) (primary AND election) OR (international AND election) OR election)'
  },
  {
    name: 'Energy & Environment',
    searchValue: `(enviornment OR (energy AND enviornment) OR (green AND energy) OR (sustainable AND energy) OR (renewable AND energy))`
  },
  {
    name: 'International Relations',
    searchValue: `(international AND relations)`
  },
  {
    name: 'Healthcare',
    searchValue: '(healthcare OR (health AND insurance))'
  },
  {
    name: 'Trade',
    searchValue: '((international AND trade) OR tariff)'
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
