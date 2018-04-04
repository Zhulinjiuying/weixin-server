module.exports = {
  port: 3000,
  session: {
    secret: 'weixin-server',
    key: 'weixin-server',
    maxAge: 300000
  },
  appId: '',
  appSecret: '',
  mongodb: 'mongodb://localhost:27017/test'
}