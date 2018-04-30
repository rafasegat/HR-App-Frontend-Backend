const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({

	  name: { type: String, default: '' },

});

module.exports = mongoose.model('Organization', OrganizationSchema);
