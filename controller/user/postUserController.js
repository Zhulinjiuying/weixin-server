const getOpenid = require('../../service/getOpenid')
const getUser = require('../../service/getUser')
const createUser = require('../../service/createUser')

// /user的controller函数，用于获取微信openid

module.exports = async (ctx) => {
  let openid = ''
  const body = ctx.request.body
  if (body.openid) {
    openid = await getOpenid(body.openid)
    let user = await getUser(openid)
    // 查不到用户，新建用户
    if (!user) {
      let user = {
        id: openid,
        avatarurl: body.avatarUrl,
        nickname: body.nickName
      }
      let result = await createUser(user)
      user = result.ops[0]
      delete user.id 
      ctx.session.user = user
    } else {
      delete user.id
      ctx.session.user = user
    }
  } else {
    ctx.throw(500,'openid is null')
  }
}