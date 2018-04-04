const fs = require('fs')
const moment = require('moment')

const logger = (path) => {
  return (info) => {
    let date = moment().format('lll')
    console.log(path)
    fs.writeFileSync(path, `${ date } : ${ info }\n`, {
      flag: 'a'
    })
  }
}

const init = () => {
  global.log = logger(getPath())
}

const getPath = () => {
  let date = moment().format('YYYY-MM-DD')
  path = `./logs/${date}.md`
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