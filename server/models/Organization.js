const Model = require('objection').Model;
const bcrypt  = require('bcrypt'); 

class Organization extends Model {
  
  static get tableName() {
    return 'organization';
  }

}

module.exports = Organization;