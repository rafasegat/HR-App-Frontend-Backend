const User = require('../../models/User');
const Tools = require('../../common/tools');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

module.exports = (app) => {
  
  /*
   * Sign up
   */
  app.post('/api/account/signup', (req, res, next) => {
    
    const { body } = req;
    const { password } = body;
    let { email } = body;
    
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!Tools.validateEmail(email)) {
      return res.send({
        success: false,
        message: 'Invalid email.'
      });
    }
    if (!password) {
      return res.send({
        success: false, 
        message: 'Error: Password cannot be blank.' 
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up!'
        });
      });
    });
  });

 /*
  * Sign in 
  */
  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const { password  } = body;
    let { email } = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Password cannot be blank.'
      });
    }
    if (!Tools.validateEmail(email)) {
      return res.send({
        success: false,
        message: 'Invalid email.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.query() 
        .where('email', email)
        .then( users => {
          
          if(users.length != 1){
            return res.send({
              success: false,
              message: 'This user does not exist.'
            });
          } 

          const user = users[0];

          if (!user.validPassword(password, user.password)) {
            return res.send({ 
              success: false,
              message: 'Wrong password. Try again.'
            });
          }

          const payload = {
            admin: user.id 
          };
          
          var token = jwt.sign(payload, config.super_secret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours 
          });
          
          // All good. User validate, send the validate token
          return res.send({
                  success: true,
                  message: 'All good.', 
                  token: token
                });

        })
        .catch(err => { 
          console.log(err); 
          return res.send({
            success: true,
            message: 'Server error.'+err
          });
      });
  });
  
/*
 * Logout
 */
  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    return res.send({
        success: true,
        message: 'Good'
      });
    });

};