const config = require('config-lite')(__dirname)
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const Mongolass = require('mongolass')

const mongolass = new Mongolass()
mongolass.connect(config.mongodb.url + '/' + config.mongodb.db)

mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

module.exports = mongolass