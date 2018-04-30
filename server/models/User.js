// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); 

// const UserSchema = new mongoose.Schema({

// 	  firstName: { type: String, default: '' },
// 	  lastName: { type: String, default: '' },
// 	  email: { type: String, default: '' },
// 		password: { type: String, default: '' }, 
// 	  isDeleted: { type: Boolean, default: false },
// 		signUpDate: { type: Date, default: Date.now() }
// });

// UserSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// UserSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

// module.exports = mongoose.model('User', UserSchema);

import { Model } from 'objection';
//import Animal from './Animal';
//import Movie from './Movie';

export default class User extends Model {
  static tableName = 'user';

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      id: { type: 'integer' },
			email: { type: 'string' },
			password: { type: 'string' },
			fullName: { type: 'string', minLength: 1, maxLength: 255 },
			isDeleted: { type: 'boolean', default: false },
 		  signUpDate: { type: Date, default: Date.now() }
    }
  };

  // This object defines the relations to other models.
  static relationMappings = {
    pets: {
      relation: Model.HasManyRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one. We use the file path version
      // here to prevent require loops.
      modelClass: Animal,
      join: {
        from: 'persons.id',
        to: 'animals.ownerId'
      }
    },

    movies: {
      relation: Model.ManyToManyRelation,
      modelClass: Movie,
      join: {
        from: 'persons.id',
        // ManyToMany relation needs the `through` object to describe the join table.
        through: {
          from: 'persons_movies.personId',
          to: 'persons_movies.movieId'
        },
        to: 'movies.id'
      }
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: Person,
      join: {
        from: 'persons.id',
        to: 'persons.parentId'
      }
    },

    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Person,
      join: {
        from: 'persons.parentId',
        to: 'persons.id'
      }
    }
  };
}