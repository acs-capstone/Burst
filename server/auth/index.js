const router = require('express').Router()
const { User, Source, Topic, PoliOri } = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      include: [{ model: Source }, { model: Topic }, { model: PoliOri }]
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      console.log('LOGGING IN', req.login)
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})


router.use('/google', require('./google'))
// router.use('/google', (req, res, next) => {
//   console.log('****')
//   next();
// })

router.get('/me', async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user.id, {
        include: [{ model: Source }, { model: Topic }, { model: PoliOri }]
      })
      res.json(user)
    } else {
      res.json(req.user);
    }
  } catch (err) {
    console.log(err)
  }
})


