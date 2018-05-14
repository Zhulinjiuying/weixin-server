const Koa = require('koa')
const path = require('path')
var cors = require('koa2-cors')
const serve = require('koa-static')
const config = require('config-lite')(__dirname)
const koabody = require('koa-body')
const session = require('koa-session')
const MongoStore = require('koa-session-mongo2')
const handler = require('./middlewares/handler')
const logger = require('./middlewares/logger')
const setRouters = require('./router/routerLoader')

const app = new Koa()

app.keys = [config.session.keys]

app.use(serve(path.join(__dirname, 'public')))
app.use(handler)
app.use(logger)
app.use(session({
  store: new MongoStore({
      url: config.mongodb.url,
      db: config.mongodb.db,
      collection: config.mongodb.collection,
      maxAge: config.session.maxAge
  }),
  signed: false,
  maxAge: config.session.maxAge
},app))
app.use(cors({
  origin: function(ctx) {
    if (ctx.url.indexOf('/api') !== -1) {
      return '*'
    } else {
      return false
    }
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(koabody())
app.use(setRouters())

app.listen(8088, () => {
  log('server started')
})