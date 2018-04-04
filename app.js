const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const config = require('config-lite')(__dirname)
const koaBody = require('koa-body')
const session = require('koa-session')
const mongoose = require('mongoose')
const setRouters = require('./router/routerLoader')
const MongooseStore = require('koa-session-mongoose')

const app = new Koa()
mongoose.connect(config.mongodb)

app.use(serve(path.join(__dirname, 'public')))
app.use(koaBody())
app.use(session({
  key: config.session.key,
  maxAge: config.session.maxAge,
  renew: true,
  store: new MongooseStore({
    url: config.mongodb
  })
}, app))
app.use(setRouters())

app.listen(8088, () => {
  console.log('服务器启动')
})