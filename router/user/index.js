const postUserController = require('../../controller/user/postUserController')
const getUserController = require('../../controller/user/getUserController')

const postUser = async (ctx, next) => {
  await postUserController(ctx)
}

const getUser = async (ctx, next) => {
  getUserController(ctx)
}

module.exports = [
  {
    router: postUser,
    method: 'post'
  },
  {
    router: getUser,
    method: 'get'
  }
]