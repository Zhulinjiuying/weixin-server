const UserModel = require('../models/users')

module.exports = async (user) => {
  let promise = new Promise((resolve, reject) => {
    resolve(UserModel.create(user))
  })
  return promise
}