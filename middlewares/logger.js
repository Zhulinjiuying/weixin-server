const fs = require('fs')
const moment = require('moment')

const logger = (path) => {
  return (info) => {
    let date = moment().format('lll')
    fs.writeFileSync(path, `${ date } : ${ info }\n`, {
      flag: 'a'
    })
  }
}

const init = () => {
  if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs')
  } 
  global.log = logger(getPath())
}

const getPath = () => {
  let date = moment().format('YYYY-MM-DD')
  path = `./logs/${date}.log`
  return path
}

module.exports = {
  init: init,
  log: async (ctx, next) => {
    if (fs.existsSync(getPath())) {
      log()
    } else {
      init()
    }
    await next()
  }
}