const sources = require('./parser/rankings.json')
const { Source, PoliOri } = require('./db/models/')
const db = require('./db')
//console.log(sources)

const poliOriSeed = async () => {
  try {
    await Promise.all([
      PoliOri.create({ poliOri: 'Left' }),
      PoliOri.create({ poliOri: 'Lean Left' }),
      PoliOri.create({ poliOri: 'Center' }),
      PoliOri.create({ poliOri: 'Lean Right' }),
      PoliOri.create({ poliOri: 'Right' })
    ])
  } catch (e) {}
}
const allSidesSeed = async () => {
  for (let i = 0; i < sources.length; i++) {
    try {
      await Source.create(sources[i])
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
