const moment = require('moment')

module.exports = async (ctx) => {
	ctx.response.body = moment().format('YYYY-MM-DD')
	ctx.session.view = 0
}