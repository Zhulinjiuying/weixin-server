const getOpenid = require('../../service/getOpenid')
const UserModel = require('../../models/users')

// /user的controller函数，用于获取微信openid

module.exports = async (ctx) => {
  let openid = ''
  const body = ctx.request.body
  if (body.openid) {
    openid = await getOpenid(body.openid)
    let user = await UserModel.getUserByName(openid)
    // 查不到用户，新建用户
    if (!user) {
      let user = {
        id: openid,
        avatarurl: body.avatarUrl,
        nickname: body.nickName
      }
      let result = await UserModel.create(user)
      user = result.ops[0]
      delete user.id 
      ctx.session.user = user
    } else {
      delete user.id
      ctx.session.user = user
    }
    ctx.response.body = 'OK'
    ctx.response.status = 200
  } else {
    ctx.throw(500,'openid is null')
  }
}