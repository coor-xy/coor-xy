'use strict'

const {db, models: {User} } = require('../server/db')

const users = [
{
  username: 'Danny',
  password: '123',
  isAdmin: true,
  email: 'danny@fsa.com',
},
{
  username: 'cody',
  password: '123',
  isAdmin: false,
  email: 'cody@fsa.com',
},
 {
  username: 'murphy',
  password: '123',
  isAdmin: false,
  email: 'murphy@fsa.com',
},
{
  username: 'Blaine',
  password: '123',
  isAdmin: true,
  email: 'blaine@fsa.com',
},
{
  username: 'Edward',
  password: '123',
  isAdmin: true,
  email: 'edward@fsa.com',
},
{
  username: 'David',
  password: '123',
  isAdmin: true,
  email: 'david@fsa.com',
},
]

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  await Promise.all(users.map(user => {
    return User.create(user);
  }))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
