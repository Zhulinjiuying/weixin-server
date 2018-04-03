const postUserController = require('../../controller/user/postUserController')
const getUserController = require('../../controller/user/getUserController')

const postUser = async (ctx, next) => {
  postUserController(ctx)
}

const getUser = async (ctx, next) => {
  getUserController(ctx)
}

module.exports = [
  {
    router: postUser,
    path: '',
    method: 'post'
  },
  {
    router: getUser,
    path: '',
    method: 'get'
  }
]