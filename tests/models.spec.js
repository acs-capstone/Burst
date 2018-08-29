'use strict'

// Assertions
const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

// database
const db = require('../server/db')

// defined in ../server/db/models/User.js
describe('User model tests', () => {
  const User = db.model('user')
  describe('Validations', () => {
    it('requires email', async () => {
      const user = User.build()

      try {
        await user.validate()
        throw Error(
          'validation was successful but should have failed without `email`'
        )
      } catch (err) {
        expect(err.message).to.contain('email cannot be null')
      }
    })

    it('requires email to not be an empty string', async () => {
      const user = User.build({
        email: ''
      })

      try {
        await user.validate()
        throw Error(
          'validation was successful but should have failed if email is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
        /* handle error */
      }
    })
  })
})
