const fs = require('fs')
const path = require('path')
const moment = require('moment')


// 返回logger的偏函数
const logger = (pathUrl) => {
  return (info, level = 'info') => {
    if (['info', 'debug', 'warning', 'error'].indexOf(level) == -1) {
      level = 'info'
    }
    let date = moment().format('lll')
    fs.writeFile(pathUrl, `[${ level }]${ date } : ${ info }\n`, {
      flag: 'a'
    }, (err) => {
      if (err) {
        console.log('The logger isn\'t write: ', err)
      }
    })
  }
}

// 初始化log
const init = () => {
  if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs')
  } 
  global.log = logger(getPath())
}

// 取得保存地址
const getPath = () => {
  let date = moment().format('YYYY-MM-DD')
  let pathUrl = path.join(path.resolve('./'), `/logs/${date}.log`)
  return pathUrl
}

init()

module.exports = async (ctx, next) => {
  if (!fs.existsSync(getPath())) {
    init()
  }
  log(`${ ctx.request.host } ${ ctx.request.method } ${ ctx.request.url }`)
  await next()
}