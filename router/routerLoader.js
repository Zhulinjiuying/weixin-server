const fs = require('fs')
const router = require('koa-router')
const config = require('./routerConfig')

const Router = new router()

// 遍历添加router
const setRouters = () => {
  Object.keys(config).forEach((key) => {
    let moduleUrl = `/${ key.toLowerCase() }/index.js`
    let url = './router' + moduleUrl
    if (fs.existsSync(url)) {
      const router = require('.' + moduleUrl)
      Router[router.method](key + router.path, router.router)
      console.log(`添加路由${ key + router.path }: ${ router.method }`)
    }
  })
  return Router.routes()
}

module.exports = setRouters