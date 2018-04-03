const https = require('https')
const iconv = require('iconv-lite')
const config = require('config-lite')(__dirname)

// 发送微信OPENID获取确认信息

module.exports = async (code) => {
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${ config.appId }&secret=${ config.appSecret }&js_code=${ code }&grant_type=authorization_code`
  let openid = ''
  await https.get(url, (res) => {
    let datas = []
    let size = 0
    res.on('data', (data) => {
      datas.push(data)
      size += data.length
    })
    res.on('end', () => {
      let buff = Buffer.concat(datas, size)
      let result = iconv.decode(buff, 'utf8')
      openid = JSON.parse(result).openid
    }).on('error', (err) => {
      console.log('error in getOpenid', err)
      callback.apply(null)
    })
  })
  return openid
}