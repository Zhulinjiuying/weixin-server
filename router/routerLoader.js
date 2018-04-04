const fs = require('fs')
const router = require('koa-router')
const list = require('./routerList')

const Router = new router()

// 添加router
const addRouters = (routers, key) => {
  for (let router of routers) {
    Router[router.method]('/' + key.toLowerCase() + router.path, router.router)
    console.log(`添加路由${'/' + key.toLowerCase() + router.path } : ${ router.method }`)
  }
}

// 遍历添加router
const setRouters = () => {
  Object.keys(list).forEach((key) => {
    let baseUrl = `./router/${ key.toLowerCase() }/`
    let moduleUrl = baseUrl + 'index.js'
    if (fs.existsSync(moduleUrl)) {
      let routers = require('.'+ moduleUrl)
      addRouters(routers, key)
    }
    for (let routerName of list[key]) {
      let routers = require('.' + baseUrl + routerName)
      addRouters(routers, key)
    }
  })
  return Router.routes()
}

module.exports = setRouters