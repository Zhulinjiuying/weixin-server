const fs = require('fs')
const router = require('koa-router')
const list = require('./routerList')

const Router = new router()

// 遍历添加router
const setRouters = () => {
  Object.keys(list).forEach((key) => {
    let moduleUrl = `/${ key.toLowerCase() }/index.js`
    let url = './router' + moduleUrl
    if (fs.existsSync(url)) {
      const routers = require('.' + moduleUrl)
      for (let router of routers) {
        Router[router.method]('/' + key.toLowerCase() + router.path, router.router)
        console.log(`添加路由${'/' + key.toLowerCase() + router.path } : ${ router.method }`)
      }
    }
  })
  return Router.routes()
}

module.exports = setRouters