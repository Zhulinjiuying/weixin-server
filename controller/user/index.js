const getOpenid = require('../../service/getOpenid')

// /user的controller函数，用于获取微信openid

module.exports = async (ctx) => {
  let openid = ''
  const body = ctx.request.body
  openid = await getOpenid(body.openid)
}