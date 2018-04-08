const UserModel = require('../models/users')

module.exports = async (openid) => {
  let promise = new Promise((resolve, reject) => {
    resolve(UserModel.getUserByName(openid))
  })
  return promise
}