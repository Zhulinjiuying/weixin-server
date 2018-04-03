const postLoginController = require('../../controller/user/index')

const postLogin = async (ctx, next) => {
  postLoginController()
}

module.exports = {
  router: postLogin,
  path: '/',
  method: 'post'
}