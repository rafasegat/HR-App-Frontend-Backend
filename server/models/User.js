const Model = require('objection').Model;
const bcrypt  = require('bcrypt'); 

class User extends Model {
  
  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        password: { type: 'string' },
        fullName: { type: 'string', minLength: 1, maxLength: 255 },
        isDeleted: { type: 'boolean' },
        created_at: { type: 'date' }
      }
    };
  };
  validPassword(password_input, password) {
    return bcrypt.compareSync(password_input, password);
  };
}

module.exports = User;