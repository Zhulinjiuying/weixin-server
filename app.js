const Koa = require('koa')
const koaBody = require('koa-body')
const setRouters = require('./router/routerLoader')

const app = new Koa()

app.use(setRouters())

app.listen(8088, () => {
  console.log('服务器启动')
})