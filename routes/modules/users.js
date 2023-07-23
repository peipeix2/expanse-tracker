const express = require('express')
const passport = require('passport')
const router = express.Router()
const Users = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  // 加入 middleware，驗證 request 登入狀態
  successRedirect:'/',
  failureRedirect:'/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  Users.findOne({email})
    .then((user) => {
      if(user) {
        console.log('This user already exists.')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return Users.create({
          name: name,
          email: email,
          password: password,
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
      
    })
  .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router