const fs = require('fs')
const path = require('path')
const router = require('koa-router')

const Router = new router()

/*  扫描文件
    如果是文件则执行addRouter添加路由
    如果是文件夹则迭代执行扫描
*/
const scanFile = (url) => {
  let fileList = fs.readdirSync(url)
  for (file of fileList) {
    let item = fs.statSync(url + file)
    if (!item.isDirectory()) {
      addRouter(url, file)
    } else {
      scanFile(url + file + '/')
    }
  }
}

// 添加router
const addRouter = (url, file) => {
  if (file === 'index.js') {
    let routers = require(url + file)
    for (let router of routers) {
      let routerUrl = url.substring(1, url.length + 1)
      Router[router.method](routerUrl, router.router)
      log(`add router : ${routerUrl} : ${ router.method }`)
    }
  }
}

// 遍历添加router
const setRouters = () => {
  let pathname = path.resolve('./')
  process.chdir(pathname + path.sep + 'router')
  scanFile('./')
  process.chdir(pathname)
  return Router.routes()
}

module.exports = setRouters