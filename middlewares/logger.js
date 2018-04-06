const fs = require('fs')
const moment = require('moment')


// 返回logger的偏函数
const logger = (path) => {
  return (info, level = 'info') => {
    if (!(level in ['info', 'warning', 'error'])) {
      level = 'info'
    }
    let date = moment().format('lll')
    fs.writeFileSync(path, `[${ level }]${ date } : ${ info }\n`, {
      flag: 'a'
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
  path = `./logs/${date}.log`
  return path
}

module.exports = {
  init: init,
  log: async (ctx, next) => {
    if (!fs.existsSync(getPath())) {
      init()
    }
    log(`${ ctx.request.host } ${ ctx.request.method } ${ ctx.request.url }`)
    await next()
  }
}