// Copy this file as config.js in the same folder, with the proper database connection URI.

const username = encodeURIComponent('rafasegat'); 
const username_mLab = encodeURIComponent('rafsegat'); 

const password = encodeURIComponent('07vX7nCpzRBHmsQz');

const mondoDB_prod = 'mongodb+srv://'+username+':'+password+'@cluster0-p9fx4.mongodb.net/test';
const mongoDB_dev = 'mongodb+srv://'+username+':'+password+'@cluster0-p9fx4.mongodb.net/test';

const mongoDB_mLab_prod = 'mongodb://'+username_mLab+':'+password+'@ds143099.mlab.com:43099/feedback360';
const mongoDB_mLab_dev = 'mongodb://'+username_mLab+':'+password+'@ds143099.mlab.com:43099/feedback360';

module.exports = {
  db: mongoDB_dev,
  db_dev: mondoDB_prod
};
