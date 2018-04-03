const https = require('https')
const iconv = require('iconv-lite')
const config = require('config-lite')(__dirname)

// 发送微信OPENID获取确认信息

module.exports = async (code) => {
  url = `https://api.weixin.qq.com/sns/jscode2session?appid=${ config.appId }&secret=${ config.appSecret }&js_code=${ code }&grant_type=authorization_code`
  let promise = new Promise((resolve, reject) => {
    https.get(url, function (res) {
      var datas = []
      var size = 0
      res.on('data', function (data) {
        datas.push(data)
        size += data.length
      })
      res.on('end', function () {
        var buff = Buffer.concat(datas, size)
        var result = iconv.decode(buff, 'utf8')
        resolve(JSON.parse(result).openid)
      })
    }).on('error', function (err) {
      console.log('error in getOpenid', err)
      callback.apply(null)
    })
  })
  return promise
}