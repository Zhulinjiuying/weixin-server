const Koa = require('koa')
const path = require('path')
var cors = require('koa2-cors')
const serve = require('koa-static')
const convert = require('koa-convert')
const config = require('config-lite')(__dirname)
const koabody = require('koa-body')
const session = require('koa-session-redis')
const handler = require('./middlewares/handler')
const logger = require('./middlewares/logger')
const setRouters = require('./router/routerLoader')

const app = new Koa()

app.use(serve(path.join(__dirname, 'public')))
app.use(handler)
app.use(logger)
app.keys = ['koa:sess'];
app.use(convert(session({
    rolling: true,
    store: {
      host: process.env.SESSION_PORT_6379_TCP_ADDR || '127.0.0.1',
      port: process.env.SESSION_PORT_6379_TCP_PORT || 6379,
      ttl: 3600,
    },
  },
)))
app.use(cors({
  origin: function(ctx) {
    if (ctx.url.indexOf('/api') !== -1) {
      return ctx.request.headers.origin
    } else {
      return false
    }
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(koabody())
app.use(setRouters())

app.listen(8088, () => {
  log('server started')
})