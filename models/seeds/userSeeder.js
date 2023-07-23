const User = require('../user')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [{
  name: '廣志',
  email: 'dad@example.com',
  password: '123'
},
{ name: '小新',
  email: 'kid@example.com',
  password: '1234'
}]

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  bcrypt.genSalt(10)
    .then(salt => {
      const hashPromises = SEED_USER.map(user => {
        return bcrypt.hash(user.password, salt)
      })
      return Promise.all(hashPromises)
    })
    .then(hashes => {
      const usersToCreate = SEED_USER.map((user, index) => {
        return {
          name: user.name,
          email: user.email,
          password: hashes[index]
        }
      })
      return User.create(usersToCreate)
    })
    .then(() => {
      console.log('Done. User seeded.')
      process.exit()
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
})