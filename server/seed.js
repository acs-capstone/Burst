const sources = require('./parser/rankings.json')
const { Source, PoliOri, Topic } = require('./db/models/')
const db = require('./db')
const sourcesObj = require('./parser/allSidesSourceIdParser')

sources.forEach(source => {
  if (sourcesObj[source.name]) {
    source.newsApiId = sourcesObj[source.name]
    console.log(source)
  }
})

// const topics = [
//   { name: 'Women’s Rights' },
//   { name: 'Finance & Tax' },
//   { name: 'Gun Control' },
//   { name: 'Immigration' },
//   { name: 'Elections' },
//   { name: 'Energy & Environment' },
//   { name: 'International Relations' },
//   { name: 'Healthcare' },
//   { name: 'Trade' }
// ]

// const topicsSeed = async () => {
//   try {
//     await Promise.all(topics.map(topic => {
//       Topic.create(topic)
//     })
//     )
//   } catch (err) {
//     console.log(err)
//   }
// }

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

const allSidesSeed = async () => {
  for (let i = 0; i < sources.length; i++) {
    try {
      const source = await Source.create(sources[i])
      //Source.setPoliOri({}) need syntax for this
    } catch (err) {
      console.log(err)
    }
  }
  console.log(`seeded ${sources.length} sources`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await db.sync({ force: true })
    console.log('db synced!')
    await poliOriSeed()
    await allSidesSeed()
    // await topicsSeed()
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

// const require './db/Source'urce = (require './db/Source')
// sources.forEach(async source => {
//   const source = await Source.create(source)
// })
