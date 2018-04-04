const getUserController = require('../../controller/user/getUserController')

const postUser = async (ctx, next) => {
  getUserController(ctx)
}

module.exports = [
  {
    router: postUser,
    path: '/post',
    method: 'get'
  }
]