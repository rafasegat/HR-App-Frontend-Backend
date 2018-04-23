const mongoose = require('mongoose');

const UsersSessionSchema = new mongoose.Schema({

	userId: { type: Number, default: -1 },
	timestamp: { type: Date, default: Date.now() },
	isDeleted: { type: Boolean, default: false }

});

module.exports = mongoose.model('UserSession', UserSchema);