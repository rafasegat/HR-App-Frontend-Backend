const Model = require('objection').Model;

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
}

module.exports = User;