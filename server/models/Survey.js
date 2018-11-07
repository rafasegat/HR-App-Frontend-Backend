const Model = require('objection').Model;

class Survey extends Model {
  
  static get tableName() {
    return 'survey';
  }
  
}

module.exports = Survey;