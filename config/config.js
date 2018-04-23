// Copy this file as config.js in the same folder, with the proper database connection URI.

const username = encodeURIComponent('rafasegat'); 
const password = encodeURIComponent('07vX7nCpzRBHmsQz');

module.exports = {
  db: 'mongodb+srv://'+username+':'+password+'@cluster0-p9fx4.mongodb.net/test',
  db_dev: 'mongodb+srv://'+username+':'+password+'@cluster0-p9fx4.mongodb.net/test'
};
