const mongoose = require('mongoose')

const comments =new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	Article: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Article'
	}
}, { timestamps: true })

module.exports = Comments = mongoose.model('comments', comments)