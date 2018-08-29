'use strict'

// Assertions
const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

// database
const db = require('../server/db')

// Routes
const app = require('../server')
const agent = require('supertest')(app)

// defined in ../server/api/users.js
describe('User routes', () => {
  const User = db.model('user')
  let storedUsers

  const userData = [
    {
      email: 'cody@email.com'
    },
    {
      email: 'admin@email.com'
    }
  ]

  beforeEach(async () => {
    const createdUsers = await User.bulkCreate(userData)
    storedUsers = createdUsers.map(user => user.dataValues)
  })

  // Route for fetching all users
  describe('GET /api/users', () => {
    it('serves up all Users', async () => {
      const response = await agent.get('/api/users').expect(200)
      expect(response.body).to.have.length(2)
      expect(response.body[0].email).to.equal(storedUsers[0].email)
    })
  })

  // Route for fetching a single user
  describe('GET /api/users/:id', () => {
    it('serves up a single user by their id', async () => {
      const response = await agent.get('/api/users/1').expect(200)
      expect(response.body.email).to.equal('cody@email.com')
    })
  })
})

describe('Sources routes', () => {
  const Source = db.model('source')
  let storedSources

  const sourceData = [
    {
      newsApiId: 'new-york-times'
    },
    {
      newsApiId: 'bloomberg'
    }
  ]

  beforeEach(async () => {
    const createdSources = await Source.bulkCreate(sourceData)
    storedSources = createdSources.map(source => source.dataValues)
  })

  // Route for fetching all sources
  describe('GET /api/sources', () => {
    it('serves up all Sources', async () => {
      const response = await agent.get('/api/sources').expect(200)
      expect(response.body).to.have.length(2)
      expect(response.body[0].newsApiId).to.equal(storedSources[0].newsApiId)
    })
  })
})
