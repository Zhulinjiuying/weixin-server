const mogolass = require('../utils/mongo')

const User = mongolas.model('User', {
  id: { type: 'string', required: true},
  nickname: { type: 'string', default: ' '},
  avatarurl: { type: 'string', default: '' }
})

User.index({ id: 1 }, { unique: true }).exec()

module.exports = {
  // 注册一个用户
  create: (user) => {
    return User.create(user).exec()
  },

  // 通过用户名(openid)获取用户信息
  getUserByName: (openid) => {
    return User
      .findOne({ id: openid })
      .addCreatedAt()
      .exec()
  },

  // 通过ID获取用户名
  getUserById: (id) => {
    return User
      .findOne({ _id: id })
      .addCreatedAt()
      .exec()
  }
}